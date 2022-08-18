import { FullDidDetails } from '@kiltprotocol/did';
import { DidResourceUri, DidUri, Message, MessageBodyType, SigningAlgorithms, Utils } from '@kiltprotocol/sdk-js';
import { Keyring } from '@polkadot/keyring';
import { ctypesList } from '../constants/ctypes';
import { encryptionKeystore } from './utils';

export const getOwnerKeyring = () => {
  const mnemonic = process.env.OWNER_MNEMONIC;
  if (!mnemonic) throw Error('Must add OWNER_MNEMONIC env var');

  const keyring = new Keyring({
    type: SigningAlgorithms.Sr25519,
    ss58Format: 38
  });

  keyring.addFromMnemonic(mnemonic);
  return keyring;
};

export const buildRequestCredentialMessage = async (
  fullDid: FullDidDetails,
  encryptionKeyId: DidResourceUri
) => {
  if (!fullDid || !fullDid.encryptionKey) return;
  const cTypes = ctypesList.map(c => ({ name: c.schema.title, cTypeHash: c.hash }));
  const challenge = Utils.UUID.generate();
  const content = { cTypes, challenge };
  const type = MessageBodyType.REQUEST_CREDENTIAL;
  const keyDid = encryptionKeyId.replace(/#.*$/, '') as DidUri;
  const message = new Message({ content, type }, fullDid.uri, keyDid);

  const encryptedMessage = await message.encrypt(
    fullDid.encryptionKey.id,
    fullDid,
    encryptionKeystore,
    encryptionKeyId
  );

  return encryptedMessage;
};
