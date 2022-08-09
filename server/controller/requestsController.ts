import { DidUri, IRequestForAttestation } from '@kiltprotocol/sdk-js';
import { Request, Response } from 'express';
import { attesterList } from '../constants/attesters';
import { ctypesList } from '../constants/ctypes';
import { Status } from '../constants/status.enum';
import { IAttesterCtype } from '../interfaces/attesterCtype';
import { IRequestDetailResponse } from '../interfaces/requestDetail';
import { createClaim, createRequest } from '../kilt/claimer';
import { getFullDidDetails } from '../kilt/utils';
import { AttesterCtype } from '../schemas/attesterCtype';
import { RequestAttestation } from '../schemas/requestAttestation';
import { websocket } from '../services/websocket';

/**
 * Creates and submits a new request for attestation.
 */
 export async function createAttesterRequest(req: Request, res: Response) {
  const { claimerDidUri, attesterCtype, form }: {
    claimerDidUri: DidUri,
    attesterCtype: IAttesterCtype,
    form: any
  } = req.body;
  const { connection } = websocket();

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

  const claim = createClaim(ctypeSchema, fullDidDetails, form);
  const request: IRequestForAttestation = await createRequest(claim, fullDidDetails);

  const requestForSave = new RequestAttestation({
    request,
    ctypeId: ctypeSchema.$id,
    claimerDid: claimerDidUri,
    status: Status.unverified
  });

  const saved = await requestForSave.save();

  // sends the new request to the clients to update
  // the attesters requests table
  const requestToSend: IRequestDetailResponse = {
    _id: saved._id.toString(),
    claimerDidUri: saved.claimerDid,
    ctypeName: saved.ctypeId,
    status: saved.status
  };

  connection?.send(JSON.stringify(requestToSend));

  return res.status(200).json({
    success: true,
    data: saved
  });
}

/**
 * List all the requests for attestation for the current attester.
 */
 export const getRequests = async (req: Request, res: Response) => {
  const { did } = req.params;

  const attester = attesterList.find(a => a === did);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'Not a valid attester.'
    });
  }

  const ctypesToAttest = await AttesterCtype.find({
    attesterDidUri: did
  });
  if (!ctypesToAttest) {
    return res.status(400).json({
      success: false,
      msg: 'Ctype to attest not found.'
    });
  }

  const ctypeIds = ctypesToAttest.map(cta => cta.ctypeId);

  const requests = await RequestAttestation.find(
    { ctypeId: { $in: ctypeIds } });

  const data = requests.map(r => ({
    _id: r._id,
    claimerDidUri: r.claimerDid,
    ctypeName: r.ctypeId,
    status: r.status
  }));

  return res.status(200).json({ success: true, data });
};

export const getRequestDetail = async (req: Request, res: Response) => {
  const { id, did } = req.params;

  const request = await RequestAttestation.findById(id);
  if (!request) {
    return res.status(404).json({
      success: false,
      msg: 'Request for attestation not found.'
    });
  }

  const attesterCtype = await AttesterCtype.findOne({
    ctypeId: request?.ctypeId,
    attesterDidUri: did
  });
  if (!attesterCtype) {
    return res.status(404).json({
      success: false,
      msg: 'Attester ctype not found.'
    });
  }

  const ctype = ctypesList.find(c => c.$id === request?.ctypeId);
  if (!ctype) {
    return res.status(400).json({
      success: false,
      msg: 'Invalid ctype id'
    });
  }

  const data: IRequestDetailResponse = {
    _id: request._id.toString(),
    claimerDidUri: request?.claimerDid,
    ctypeName: ctype?.title,
    terms: attesterCtype?.terms,
    form: request.request.claim.contents,
    status: request.status
  };

  return res.status(200).json({
    success: true,
    data
  });
};
