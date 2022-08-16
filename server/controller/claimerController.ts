import { Request, Response } from 'express';
import { ICredentialByDidResponse } from '../interfaces/credentialEndpointResponse';
import { DidUri, IRequestForAttestation } from '@kiltprotocol/sdk-js';
import {
  buildCredential,
  createClaim,
  createRequest,
  getEndpointResponse,
  getEndpointsFromDid
} from '../kilt/claimer';
import { ClaimerCredential, IClaimerCredential } from '../schemas/credential';
import { websocket } from '../services/websocket';
import { Status } from '../constants/status.enum';
import { getFullDidDetails } from '../kilt/utils';
import { ctypesList } from '../constants/ctypes';
import { IAttesterCtype } from '../schemas/attesterCtype';

/**
 * Creates and submits a new credential
 * request for attestation.
 * @returns { success: boolean, data: Document<IClaimerCredential> }
 */
 export async function createCredential(req: Request, res: Response) {
  const { claimerDidUri, claimerWeb3name, attesterCtype, form }: {
    claimerDidUri: DidUri,
    claimerWeb3name: string,
    attesterCtype: IAttesterCtype,
    form: string
  } = req.body;

  if (!claimerDidUri || !attesterCtype || !form) {
    return res.status(400).json({
      success: false,
      msg: 'Must provide claimerDid, attesterCtype and form.'
    });
  }

  const ctypeSchema = ctypesList.find(c => c.$id === attesterCtype.ctypeId);
  if (!ctypeSchema) {
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

  const claim = createClaim(ctypeSchema, fullDidDetails, JSON.parse(form));
  const request: IRequestForAttestation = await createRequest(claim, fullDidDetails);

  const credential = new ClaimerCredential({
    request,
    ctypeId: ctypeSchema.$id,
    ctypeName: ctypeSchema.title,
    attesterDid: '',
    attesterWeb3name: '',
    claimerDid: claimerDidUri,
    claimerWeb3name,
    status: Status.unverified
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
    ctypeId: saved.ctypeId
  };

  websocket().connection?.send(JSON.stringify(requestToSend));

  return res.status(200).json({
    success: true,
    data: saved
  });
}

/**
 * Fetchs all the credentials for a claimer.
 * First, itlooks to the endpoints created fetching all the
 * data, and then filters this data to build the credentials.
 * @returns { success: boolean, data: ICredentialByDidResponse[] }
 */
export async function getCredentialsByDid(req: Request, res: Response) {
  const { did } = req.params;

  if (!did) {
    return res.status(400).json({
      success: false,
      msg: 'Must provide DiD parameter'
    });
  }

  if (!did.startsWith('did:kilt:')) {
    return res.status(400).json({
      success: false,
      msg: 'Wrong DiD format'
    });
  }

  const endpoints = await getEndpointsFromDid(did as DidUri);
  if (!endpoints) {
    return res.status(200).json({ success: true, data: [] });
  }

  const endpointResponse = await getEndpointResponse(endpoints[0]);
  const attestedCredentials: ICredentialByDidResponse[] = await Promise
    .all(endpointResponse.map(buildCredential));

  const savedCredentials = await ClaimerCredential.find({ claimerDid: did });

  const notAttestedCredentials = savedCredentials.map((c) => ({
    _id: c._id,
    attesterWeb3name: c.attesterWeb3name,
    attesterDidUri: c.attesterDid,
    label: c.ctypeId,
    status: c.status
  }));

  const credentials = [...attestedCredentials, ...notAttestedCredentials];

  return res.status(200).json({ success: true, data: credentials });
}
