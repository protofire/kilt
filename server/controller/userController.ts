import { Did, DidResourceUri, DidUri } from '@kiltprotocol/sdk-js';
import { Request, Response } from 'express';
import { attesterList } from '../constants/attesters';
import { formatDidUri, keyToDidUri } from '../kilt/utils';
import { randomAsHex } from '@polkadot/util-crypto';
import { buildRequestCredentialMessage } from '../kilt/account';
import { ISessionInfo } from '../interfaces/sessionInfo';
import { verifyDidSignature } from '@kiltprotocol/did';
import { UUID } from '@kiltprotocol/utils';
import { ILoginInfo } from '../interfaces/loginInfo';
import { z } from "zod";
import { didResourceUriRegex } from '../constants/regex';

const VerifySignature = z.object({
  message: z.string(),
  signature: z.string(),
  keyUri: z.string().regex(didResourceUriRegex),
});

/**
 * Verifies the signature provided by the user to login with Did
 * @returns { 
 *  success: boolean,
 *  msg: string,
 *  isAttester: boolean,
 *  web3name: string,
 *  didUri: string,
 * }
 */
export const verifySignature = async (req: Request, res: Response) => {
  const parsed = VerifySignature.safeParse(req.body);

  if(!parsed.success) {
    return res.status(400).json({
      success: false,
      msg: 'Wrong data please provide valid message, signature and keyUri'
    });
  }
  
  const { message, signature, keyUri } = parsed.data;
  const result = await verifyDidSignature({
    message,
    signature: {
      signature,
      keyUri: keyUri as DidResourceUri
    }
  });
  if (!result.verified) {
    return res.status(400).json({ success: false, msg: 'Not verified' });
  }

  const didUri = keyToDidUri(keyUri as DidResourceUri);
  const attester = attesterList.find(a => a === didUri);
  const isAttester = !!attester;

  const web3name = await Did.Web3Names
    .queryWeb3NameForDid(didUri as DidUri) ??
    formatDidUri(didUri as DidUri);

  return res.status(200).json({
    success: true,
    msg: 'verified',
    isAttester,
    web3name,
    didUri
  });

  return res.status(200).json({ success: true, msg: 'verified' });
}

export const getLoginInfo = async (req: Request, res: Response) => {
  const data: ILoginInfo = {
    message: UUID.generate()
  };
  return res.status(200).json({ data });
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
