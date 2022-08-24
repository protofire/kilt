import { Did, DidResourceUri, DidUri } from '@kiltprotocol/sdk-js';
import { Request, Response } from 'express';
import { attesterList } from '../constants/attesters';
import {
  formatDidUri,
  keyToDidUri,
  signMessage,
  verifySignedMessage
} from '../utils/utils';
import { randomAsHex } from '@polkadot/util-crypto';
import { buildRequestCredentialMessage } from '../utils/account';
import { ISessionInfo } from '../interfaces/sessionInfo';
import { verifyDidSignature } from '@kiltprotocol/did';
import { UUID } from '@kiltprotocol/utils';
import { z } from "zod";
import { didResourceUriRegex } from '../constants/regex';
import * as jwt from 'jsonwebtoken';

const VerifySignature = z.object({
  message: z.string(),
  ownerSignature: z.string(),
  didSignature: z.string(),
  keyUri: z.string().regex(didResourceUriRegex),
});

const BuildMessage = z.object({
  encryptionKeyId: z.string().regex(didResourceUriRegex),
});

/**
 * Signs and sends a random message to the frontend
 * for sign in using sporran wallet
 * @returns { 
 *  success: boolean,
 *  msg: string,
 *  message: string,
 *  ownerSignature: string,
 * }
 */
export const getLoginInfo = async (req: Request, res: Response) => {
  const { message, signature } = signMessage(UUID.generate());
  return res.status(200).json({
    success: true,
    msg: '',
    message,
    ownerSignature: signature 
  });
}

/**
 * Verifies the signature provided by the user to login with Did
 * @returns { 
 *  success: boolean,
 *  msg: string,
 *  token: string,
 * }
 */
export const verifySignature = async (
  req: Request,
  res: Response
) => {
  const parsed = VerifySignature.safeParse(req.body);

  if(!parsed.success) {
    return res.status(400).json({
      success: false,
      msg:
        `Wrong data please provide valid message, signature and keyUri`
    });
  }
  
  const {
    message,
    ownerSignature,
    didSignature,
    keyUri
  } = parsed.data;

  // verifies that the message was signed by the app owner
  const isValid = verifySignedMessage(
    message,
    ownerSignature
  );
  if (!isValid) {
    return res.status(400).json({
      success: false,
      msg: 'Not a signed message'
    });
  }

  // verifies that the message was signed by the logged user
  const result = await verifyDidSignature({
    message,
    signature: {
      signature: didSignature,
      keyUri: keyUri as DidResourceUri
    }
  });
  if (!result.verified) {
    return res.status(400).json({
      success: false,
      msg: 'Not verified'
    });
  }

  if(!process.env.SECRET) {
    return res.status(400).json({
      success: false,
      msg: 'You must set a SECRET env variable'
    });
  }

  const didUri = keyToDidUri(keyUri as DidResourceUri);
  const attester = attesterList.find(a => a === didUri);
  const isAttester = !!attester;

  const web3name = await Did.Web3Names
    .queryWeb3NameForDid(didUri as DidUri) ??
    formatDidUri(didUri as DidUri);
  
  var token = jwt.sign({
    isAttester,
    web3name,
    didUri
  }, process.env.SECRET);
  
  return res.status(200).json({
    success: true,
    msg: 'verified',
    token
  });
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

  const fullDid = await Did
    .FullDidDetails
    .fromChainInfo(did as DidUri);
  if (!fullDid || !fullDid.encryptionKey) {
    return res.status(400).json({
      success: false,
      msg: 'Unable to get full did details'
    });
  }

  const dAppEncryptionKeyUri = fullDid
    .assembleKeyUri(fullDid.encryptionKey.id);

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
  const parsed = BuildMessage.safeParse(req.body);

  if(!parsed.success) {
    return res.status(400).json({
      success: false,
      msg: `Wrong data please provide valid encryptionKeyId`
    });
  }

  const { encryptionKeyId } = parsed.data;

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

  const message = await buildRequestCredentialMessage(
    fullDid,
    encryptionKeyId as DidResourceUri
  );
  const data = { message };
  return res.status(200).json({ data });
};
