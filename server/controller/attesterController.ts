import { Did, DidUri } from '@kiltprotocol/sdk-js';
import { Request, Response } from 'express';
import { attesterList } from '../constants/attesters';
import { ctypesList } from '../constants/ctypes';
import { Status } from '../constants/enum/status.enum';
import { getOwnerKeyring } from '../utils/account';
import { createAttestation, submitAttestation } from '../utils/attestation';
import { getFullDidDetails, getKeystoreSigner } from '../utils/utils';
import { AttesterCtype } from '../schemas/attesterCtype';
import { ClaimerCredential, IClaimerCredential } from '../schemas/credential';
import { ConfirmRequest, GetRequestDetail, VerifyRequest } from './validation/attester';
import { UserSchema } from './validation/user';

/**
 * List all the requests for credential
 * attestation for the current attester.
 * @returns { data: IClaimerCredential[] }
 */
export const getRequests = async (
  req: Request,
  res: Response
) => {
  const parsed = UserSchema.safeParse(req.params.user);

  if (!parsed.success) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized access'
    });
  }
  
  const { didUri } = parsed.data;
  const attester = attesterList.find(a => a === didUri);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'Not a valid attester.'
    });
  }

  const ctypesToAttest = await AttesterCtype.find({
    attesterDidUri: didUri
  });
  if (!ctypesToAttest) {
    return res.status(400).json({
      success: false,
      msg: 'Ctype to attest not found.'
    });
  }
  const ctypeIds = ctypesToAttest.map(cta => cta.ctypeId);
  const credentials: IClaimerCredential[] = await ClaimerCredential
    .find({
      status:
        { $ne: Status.verified },
        ctypeId: { $in: ctypeIds }
    })
    .sort({ _id: -1 }); // descending sort

  return res.status(200).json({
    success: true,
    data: credentials
  });
};

/**
 * List all the requests for credential
 * attestation for the current attester.
 * @returns { data: IClaimerCredential }
 */
export const getRequestDetail = async (
  req: Request,
  res: Response
) => {
  const parsed = GetRequestDetail.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      msg: 'Must provide a valid id'
    });
  }

  const { id, user } = parsed.data;
  const credential = await ClaimerCredential.findById(id);
  if (!credential) {
    return res.status(404).json({
      success: false,
      msg: 'Request for attestation not found.'
    });
  }

  const attesterCtype = await AttesterCtype.findOne({
    ctypeId: credential.ctypeId,
    attesterDidUri: user.didUri
  });
  if (!attesterCtype) {
    return res.status(404).json({
      success: false,
      msg: 'Attester ctype not found.'
    });
  }

  const ctype = ctypesList.find(c =>
    c.schema.$id === credential.ctypeId
  );
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
    ctypeName: ctype.schema.title,
    attesterDid: credential.attesterDid,
    attesterWeb3name: credential.attesterWeb3name,
    terms: attesterCtype.terms,
    quote: attesterCtype.quote,
    form: credential?.request?.claim.contents,
    status: credential.status
  };

  return res.status(200).json({
    success: true,
    data
  });
};

/**
 * Verifies the credential attestation
 * request and sumits it to the blockchain
 * @returns { data: Credential }
 */
export const verifyRequest = async (
  req: Request,
  res: Response
) => {
  const parsed = VerifyRequest.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      msg: 'Must provide a valid id'
    });
  }

  const { id, user } = parsed.data;
  const currentCredential = await ClaimerCredential.findById(id);
  if (!currentCredential?.request) {
    return res.status(404).json({
      success: false,
      msg: 'Request for attestation not found.'
    });
  }

  const attesterFullDid =
    await getFullDidDetails(user.didUri as DidUri);
  if (!attesterFullDid) {
    return res.status(404).json({
      success: false,
      msg: 'Attester full DiD not found.'
    });
  }

  const credential = await createAttestation(
    currentCredential.request,
    attesterFullDid
  );

  const web3Name = await Did.Web3Names
    .queryWeb3NameForDid(attesterFullDid.uri);

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

/**
 * Confirms that the payment was successfully
 * performed by the claimer and sets the credential
 * state to 'verified'
 * @returns { success: boolean }
 */
export const confirmRequest = async (req: Request, res: Response) => {
  const parsed = ConfirmRequest.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      msg: 'Must provide a valid id'
    });
  }

  const { user, id } = parsed.data;
  const attester = attesterList.find(a => a === user.didUri);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    });
  }

  const attesterFullDid =
    await getFullDidDetails(user.didUri as DidUri);
  if (!attesterFullDid) {
    return res.status(404).json({
      success: false,
      msg: 'Attester full DiD not found.'
    });
  }

  const credential = await ClaimerCredential.findById(id);
  if (!credential?.credential?.attestation?.owner ||
      !credential?.request) {
    return res.status(404).json({
      success: false,
      msg: 'Request for attestation not found.'
    });
  }

  if (credential.credential.attestation.owner !== user.didUri) {
    return res.status(400).json({
      success: false,
      msg: 'The payment must be confirmed by the issuer attester.'
    });
  }

  const keyring = getOwnerKeyring();
  if (keyring.pairs.length === 0) {
    return res.status(400).json({
      success: false,
      msg: 'No keypairs for submitter account'
    });
  }

  const keystoreSigner = getKeystoreSigner();
  await submitAttestation(
    keystoreSigner,
    attesterFullDid,
    credential.request,
    keyring.pairs[0]
  );

  credential.status = Status.verified;
  await credential.save();

  res.status(200).json({ success: true });
};
