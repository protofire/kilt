import { Request, Response } from 'express';
import { ICredentialByDidResponse } from '../interfaces/credential';
import { DidUri, IRequestForAttestation } from '@kiltprotocol/sdk-js';
import {
  buildCredential,
  createClaim,
  createRequest,
  getEndpointResponse,
  getEndpointsFromDid
} from '../kilt/claimer';
import { ctypesList } from '../constants/ctypes';
import { IAttesterCtype } from '../interfaces/attesterCtype';
import { getFullDidDetails } from '../kilt/utils';
import { Status } from '../constants/status.enum';
import { RequestAttestation } from '../schemas/requestAttestation';
import { AttesterCtype } from '../schemas/attesterCtype';

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

  const requests = await RequestAttestation.find({ claimerDid: did });
  const notAttestedCredentials = requests.map((r) => ({
    attesterDidUri: '',
    label: r.ctypeId,
    status: Status.unverified
  }));

  const credentials = [...attestedCredentials, ...notAttestedCredentials];

  return res.status(200).json({ success: true, data: credentials });
}

/**
 * Gets all the AttesterCtypes saved on database.
 * @returns { success: boolean, data: AttesterCtype[] }
 */
export async function getAttesterCtypes(req: Request, res: Response) {
  const { did } = req.params;

  if (!did || !did.startsWith('did:kilt:')) {
    return res.status(400).json({
      success: false,
      msg: 'You must provide a valid did.'
    });
  }

  const attesterCtypes = await AttesterCtype.find();
  if (!attesterCtypes) {
    return res.status(400).json({
      success: false,
      msg: 'error connecting database'
    });
  }

  return res.status(200).json({ success: true, data: attesterCtypes });
}

/**
 * Gets a single AttesterCtype by id.
 * @returns { success: boolean, data: AttesterCtype }
 */
export async function getAttesterCtypeDetail(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      msg: 'You must provide an id.'
    });
  }

  const attesterCtype = await AttesterCtype.findById(id);
  const ctype = ctypesList.find(c => c.$id === attesterCtype?.ctypeId);
  if (!attesterCtype || !ctype) {
    return res.status(404).json({
      success: false,
      msg: 'Attester Ctype not found.'
    });
  }

  // sets properties to fill by claimer
  const attesterCtypeResponse: IAttesterCtype = {
    ...attesterCtype.toJSON(),
    properties: ctype.properties
  };
  return res.status(200).json({ success: true, data: attesterCtypeResponse });
}

/**
 * Creates and submits a new request for attestation.
 */
export async function createAttesterRequest(req: Request, res: Response) {
  const { claimerDidUri, attesterCtype, form }: {
    claimerDidUri: DidUri,
    attesterCtype: IAttesterCtype,
    form: any
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

  const owner = process.env.OWNER as DidUri;
  if (!owner) {
    return res.status(400).json({
      success: false,
      msg: 'The owner did not found'
    });
  }

  const fullDidDetails = await getFullDidDetails(claimerDidUri);
  if (!fullDidDetails || fullDidDetails.uri !== claimerDidUri) {
    return res.status(400).json({
      success: false,
      msg: 'Could not load claimer DiD details'
    });
  }

  const claim = createClaim(ctypeSchema, fullDidDetails, form);
  const request: IRequestForAttestation = await createRequest(claim, fullDidDetails);

  const requestForSave = new RequestAttestation({
    request,
    ctypeId: ctypeSchema.$id,
    claimerDid: claimerDidUri,
    status: Status.unverified
  });

  const saved = await requestForSave.save();

  return res.status(200).json({
    success: true,
    data: saved
  });
}
