import { Did, DidUri } from '@kiltprotocol/sdk-js';
import { Request, Response } from 'express';
import { attesterList } from '../constants/attesters';
import { formatDidUri } from '../kilt/utils';
import { randomAsHex } from '@polkadot/util-crypto';
import { buildRequestCredentialMessage } from '../kilt/account';
import { ISessionInfo } from '../interfaces/sessionInfo';
import { verifyDidSignature } from '@kiltprotocol/did';

/**
 * Checks wheter the provided DiD is an attester or not.
 * @returns { data: { isAttester: boolean } }
 */
export const getUserDetails = async (req: Request, res: Response) => {
  const { did } = req.params;
  const attester = attesterList.find(a => a === did);
  const isAttester = !!attester;

  const web3name = await Did.Web3Names
    .queryWeb3NameForDid(did as DidUri) ??
    formatDidUri(did as DidUri);

  return res.status(200).json({
    data: { isAttester, web3name }
  });
};

/**
 * Verifies the signature provided by the user to login with Did
 * @returns { success: boolean, msg: string }
 */
export const verifySignature = async (req: Request, res: Response) => {
  const { message, signature, keyUri } = req.body;

  const result = await verifyDidSignature({
    message,
    signature: { signature, keyUri }
  });
  if (!result.verified) {
    return res.status(400).json({ success: false, msg: 'Not verified' });
  }

  return res.status(200).json({ success: true, msg: 'verified' });
}

/**
 * Gets the information for setting up the sporran session.
 * @returns { data: { sessionInfo: ISessionInfo } }
 */
export const getSessionInfo = async (req: Request, res: Response) => {
  const did = process.env.OWNER_DID;
  if (!did) {
    return res.status(400).json({
      success: false,
      msg: 'Must you must set OWNER_DID env variable'
    });
  }

  const fullDid = await Did.FullDidDetails.fromChainInfo(did as DidUri);
  if (!fullDid || !fullDid.encryptionKey) {
    return res.status(400).json({
      success: false,
      msg: 'Unable to get full did details'
    });
  }

  const dAppEncryptionKeyUri = fullDid.assembleKeyUri(fullDid.encryptionKey.id);

  const data: ISessionInfo = {
    sessionId: randomAsHex(),
    challenge: randomAsHex(),
    dappName: 'kilt',
    dAppEncryptionKeyUri
  };

  return res.status(200).json({ data });
};

/**
 * Gets the information for setting up the sporran session.
 * @returns { data: { sessionInfo: ISessionInfo } }
 */
export const buildMessage = async (req: Request, res: Response) => {
  const { encryptionKeyId } = req.body;

  const did = process.env.OWNER_DID;
  if (!did) {
    return res.status(400).json({
      success: false,
      msg: 'Must you must set OWNER_DID env variable'
    });
  }

  const didUri = did as DidUri;
  const fullDid = await Did.FullDidDetails.fromChainInfo(didUri);
  if (!fullDid || !fullDid.encryptionKey) {
    return res.status(400).json({
      success: false,
      msg: 'Unable to get full did detauls'
    });
  }

  const message = await buildRequestCredentialMessage(fullDid, encryptionKeyId);
  const data = { message };
  return res.status(200).json({ data });
};
