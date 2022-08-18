import { Did, DidUri, IEncryptedMessage, Message, MessageBodyType, Utils } from '@kiltprotocol/sdk-js';
import { Request, Response } from 'express';
import { attesterList } from '../constants/attesters';
import { encryptionKeystore, formatDidUri } from '../kilt/utils';
import { randomAsHex } from '@polkadot/util-crypto';
import { ctypesList } from '../constants/ctypes';

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

  interface ISessionInfo {
    sessionId: string;
    dappName: string;
    dAppEncryptionKeyUri: string;
    challenge: string;
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
  const {
    encryptionKeyId,
    // challenge
    // nonce
  } = req.body;
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

  interface IMessageResponse {
    message: IEncryptedMessage;
  }

  const cTypes = ctypesList.map(c => ({ name: c.schema.title, cTypeHash: c.hash }));
  const challenge = Utils.UUID.generate();
  const content = { cTypes, challenge };
  const type = MessageBodyType.REQUEST_CREDENTIAL;
  const keyDid = encryptionKeyId.replace(/#.*$/, '') as DidUri;
  const message = new Message({ content, type }, didUri, keyDid);

  const encryptedMessage = await message.encrypt(
    fullDid.encryptionKey.id,
    fullDid,
    encryptionKeystore,
    encryptionKeyId
  );

  const data: IMessageResponse = {
    message: encryptedMessage
  };

  return res.status(200).json({ data });
};
