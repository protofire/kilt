import { Request, Response } from 'express';
import { ICredentialByDidResponse } from '../interfaces/credential';
import { DidUri } from '@kiltprotocol/sdk-js';
import {
  buildCredential,
  getEndpointResponse,
  getEndpointsFromDid
} from '../kilt/claimer';
import { Status } from '../constants/status.enum';
import { RequestAttestation } from '../schemas/requestAttestation';

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
