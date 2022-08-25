import { Request, Response } from 'express';
import { ICredentialByDidResponse } from '../interfaces/credentialEndpointResponse';
import { DidUri, IRequestForAttestation } from '@kiltprotocol/sdk-js';
import {
  buildCredential,
  createClaim,
  createRequest,
  getEndpointResponse,
  getEndpointsFromDid
} from '../utils/claimer';
import { ClaimerCredential, IClaimerCredential } from '../schemas/credential';
import { websocket } from '../services/websocket';
import { Status } from '../constants/status.enum';
import { getFullDidDetails } from '../utils/utils';
import { ctypesList } from '../constants/ctypes';
import { z } from 'zod';
import { didUriRegex } from '../constants/regex';

export const UserSchema = z.object({
  isAttester: z.boolean(),
  web3name: z.string(),
  didUri: z.string().regex(didUriRegex),
});

export const AttesterCtypeSchema = z.object({
  attesterDidUri: z.string().regex(didUriRegex),
  attesterWeb3name: z.string(),
  ctypeId: z.string(),
  ctypeName: z.string(),
  quote: z.number(),
  terms: z.string(),
  _id: z.string().optional(),
  properties: z.any(),
});

export const GetCredentialById = z.object({
  id: z.string(),
  user: UserSchema
});

const CreateCredential = z.object({
  form: z.string(),
  attesterCtype: AttesterCtypeSchema
});

/**
 * Creates and submits a new credential
 * request for attestation.
 * @returns { success: boolean, data: Document<IClaimerCredential> }
 */
export async function createCredential(
  req: Request,
  res: Response
) {
  const bodyParsed = CreateCredential.safeParse(req.body);
  const userParsed = UserSchema.safeParse(req.params.user);

  if (!userParsed.success) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized access'
    });
  }

  if (!bodyParsed.success) {
    return res.status(400).json({
      success: false,
      msg: 'Must provide attesterCtype and form.'
    });
  }

  const claimerDidUri = userParsed.data.didUri as DidUri;
  const claimerWeb3name = userParsed.data.web3name;
  const { attesterCtype, form } = bodyParsed.data;

  const ctype = ctypesList.find(c =>
    c.schema.$id === attesterCtype.ctypeId
  );
  if (!ctype) {
    return res.status(400).json({
      success: false,
      msg: 'The provided ctype is invalid'
    });
  }

  const fullDidDetails = await getFullDidDetails(claimerDidUri);
  if (!fullDidDetails || fullDidDetails.uri !== claimerDidUri) {
    return res.status(400).json({
      success: false,
      msg: 'Could not load claimer DiD details'
    });
  }
  const claim = createClaim(
    ctype.schema,
    fullDidDetails,
    JSON.parse(form)
  );
  const request: IRequestForAttestation =
    await createRequest(claim, fullDidDetails);
  const credential = new ClaimerCredential({
    request,
    ctypeId: ctype.schema.$id,
    ctypeName: ctype.schema.title,
    attesterDid: '',
    attesterWeb3name: '',
    claimerDid: claimerDidUri,
    claimerWeb3name,
    status: Status.unverified,
    quote: attesterCtype.quote,
    terms: attesterCtype.terms,
  });

  const saved = await credential.save();

  // sends the new request to the clients to update
  // the attesters requests table
  const requestToSend: IClaimerCredential = {
    _id: saved._id,
    claimerDid: saved.claimerDid,
    claimerWeb3name,
    ctypeName: saved.ctypeId,
    attesterDid: '',
    attesterWeb3name: '',
    status: saved.status,
    ctypeId: saved.ctypeId,
    quote: attesterCtype.quote,
    terms: attesterCtype.terms,
  };

  websocket().connection?.send(JSON.stringify(requestToSend));

  return res.status(200).json({
    success: true,
    data: saved
  });
}

/**
 * Fetchs all saved credentials for a claimer.
 * @returns { success: boolean, data: ICredentialByDidResponse[] }
 */
export async function getCredentialsByDid(
  req: Request,
  res: Response
) {
  const parsedUser = UserSchema.safeParse(req.params.user);

  if (!parsedUser.success) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized user'
    });
  }

  const { didUri } = parsedUser.data;
  const savedCredentials = await ClaimerCredential.find({
    claimerDid: didUri
  });

  const credentials = savedCredentials.map((c) => ({
    _id: c._id,
    attesterWeb3name: c.attesterWeb3name,
    attesterDidUri: c.attesterDid,
    label: c.ctypeId,
    status: c.status
  }));

  return res.status(200).json({ success: true, data: credentials });
}

/**
 * Fetchs a credential by id
 * @returns { success: boolean, data: ICredentialByDidResponse[] }
 */
 export async function getCredentialById(
   req: Request,
   res: Response
  ) {
  const parsed = GetCredentialById.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      msg: 'Must provide an Id'
    });
  }

  const { id, user } = parsed.data;
  const credential = await ClaimerCredential.findOne({
    _id: id,
    claimerDid: user.didUri
  });
  return res.status(200).json({ success: true, data: credential });
}

/**
 * Fetchs all endpoint credentials for a claimer.
 * @returns { success: boolean, data: ICredentialByDidResponse[] }
 */
export async function getEndpointCredentialsByDid(
  req: Request,
  res: Response
) {
  const parsedUser = UserSchema.safeParse(req.body);

  if (!parsedUser.success) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized access'
    });
  }

  const { didUri } = parsedUser.data;
  const endpoints = await getEndpointsFromDid(didUri as DidUri);
  if (!endpoints) {
    return res.status(200).json({ success: true, data: [] });
  }

  const endpointResponse = await getEndpointResponse(endpoints[0]);
  const credentials: ICredentialByDidResponse[] = await Promise
    .all(endpointResponse.map(buildCredential));

  return res.status(200).json({ success: true, data: credentials });
}
