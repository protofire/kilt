import { Did, DidUri, IRequestForAttestation } from '@kiltprotocol/sdk-js';
import { Request, Response } from 'express';
import { attesterList } from '../constants/attesters';
import { ctypesList } from '../constants/ctypes';
import { Status } from '../constants/status.enum';
import { getOwnerKeyring } from '../kilt/account';
import { createAttestation } from '../kilt/attestation';
import { createClaim, createRequest } from '../kilt/claimer';
import { getFullDidDetails, getKeystoreSigner } from '../kilt/utils';
import { AttesterCtype, IAttesterCtype } from '../schemas/attesterCtype';
import { ClaimerCredential, IClaimerCredential } from '../schemas/credential';
import { websocket } from '../services/websocket';

/**
 * Creates and submits a new credential
 * request for attestation.
 */
export async function createCredential(req: Request, res: Response) {
  const { claimerDidUri, claimerWeb3name, attesterCtype, form }: {
    claimerDidUri: DidUri,
    claimerWeb3name: string,
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

  const fullDidDetails = await getFullDidDetails(claimerDidUri);
  if (!fullDidDetails || fullDidDetails.uri !== claimerDidUri) {
    return res.status(400).json({
      success: false,
      msg: 'Could not load claimer DiD details'
    });
  }

  const claim = createClaim(ctypeSchema, fullDidDetails, form);
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
 * List all the requests for credential
 * attestation for the current attester.
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
  const credentials: IClaimerCredential[] = await ClaimerCredential
    .find({ status: { $ne: Status.verified }, ctypeId: { $in: ctypeIds } })
    .sort({ _id: -1 }); // descending sort

  return res.status(200).json({ success: true, data: credentials });
};

export const getRequestDetail = async (req: Request, res: Response) => {
  const { id, did } = req.params;

  const credential = await ClaimerCredential.findById(id);
  if (!credential) {
    return res.status(404).json({
      success: false,
      msg: 'Request for attestation not found.'
    });
  }

  const attesterCtype = await AttesterCtype.findOne({
    ctypeId: credential.ctypeId,
    attesterDidUri: did
  });
  if (!attesterCtype) {
    return res.status(404).json({
      success: false,
      msg: 'Attester ctype not found.'
    });
  }

  const ctype = ctypesList.find(c => c.$id === credential.ctypeId);
  if (!ctype) {
    return res.status(400).json({
      success: false,
      msg: 'Invalid ctype id'
    });
  }

  const data: IClaimerCredential = {
    _id: credential._id,
    claimerDid: credential.claimerDid,
    claimerWeb3name: credential.claimerWeb3name,
    ctypeId: credential.ctypeId,
    ctypeName: ctype.title,
    attesterDid: credential.attesterDid,
    attesterWeb3name: credential.attesterWeb3name,
    terms: attesterCtype.terms,
    form: credential?.request?.claim.contents,
    status: credential.status
  };

  return res.status(200).json({
    success: true,
    data
  });
};

export const verifyRequest = async (req: Request, res: Response) => {
  const { id, did } = req.params;

  const currentCredential = await ClaimerCredential.findById(id);
  if (!currentCredential?.request) {
    return res.status(404).json({
      success: false,
      msg: 'Request for attestation not found.'
    });
  }

  const keystoreSigner = getKeystoreSigner();
  const attesterFullDid = await getFullDidDetails(did as DidUri);
  if (!attesterFullDid) {
    return res.status(404).json({
      success: false,
      msg: 'Attester full DiD not found.'
    });
  }

  const keyring = getOwnerKeyring();
  if (keyring.pairs.length === 0) {
    return res.status(400).json({
      success: false,
      msg: 'No keypairs for submitter account'
    });
  }

  const credential = await createAttestation(
    keystoreSigner,
    currentCredential.request,
    attesterFullDid,
    keyring.pairs[0]
  );

  const web3Name = await Did.Web3Names.queryWeb3NameForDid(attesterFullDid.uri);

  currentCredential.status = Status.prendingPayment;
  currentCredential.credential = credential;
  currentCredential.attesterDid = attesterFullDid.uri;
  currentCredential.attesterWeb3name = web3Name ?? '';
  await currentCredential.save();

  return res.status(200).json({
    success: true,
    credential
  });
};

export const confirmRequest = async (req: Request, res: Response) => {
  const { did, id } = req.params;

  const attester = attesterList.find(a => a === did);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    });
  }

  const credential = await ClaimerCredential.findById(id);
  if (!credential?.credential?.attestation?.owner) {
    return res.status(404).json({
      success: false,
      msg: 'Request for attestation not found.'
    });
  }

  if (credential.credential.attestation.owner !== did) {
    return res.status(400).json({
      success: false,
      msg: 'The payment must be confirmed by the issuer attester.'
    });
  }

  credential.status = Status.verified;
  await credential.save();

  res.status(200).json({ success: true });
};
