import {
  Did,
  DidUri,
  IIdentity,
  KeyringPair,
  KeystoreSigner,
  BlockchainUtils,
  KeystoreSigningData,
  SubmittableExtrinsic,
  ISubmittableResult,
  SigningAlgorithms,
  DidResourceUri
} from '@kiltprotocol/sdk-js';
import { Keyring } from '@kiltprotocol/utils';
import {
  naclSeal,
  sr25519PairFromSeed,
  mnemonicToMiniSecret,
  keyExtractPath,
  keyFromPath,
  blake2AsU8a,
  naclBoxPairFromSecret,
  naclOpen
} from '@polkadot/util-crypto';
import { u8aToHex, hexToU8a } from '@polkadot/util';

// promisifies the result of the transaction
export const submitTx = async (
  tx: SubmittableExtrinsic,
  signer: KeyringPair | IIdentity
) => new Promise<ISubmittableResult>((resolve) => {
  // since it tries several times until the transaction
  // succeeds we just log the failed tries to continue the app
  // workflow.
  return BlockchainUtils.signAndSubmitTx(tx, signer, {
    resolveOn: resolve,
    rejectOn: console.error
  });
});

export const keyToDidUri = (key: DidResourceUri) => {
  return key.split('#')[0] as DidUri;
}

const getFullDidDetails = async (did: DidUri) => {
  const fullDidDetails = await Did.FullDidDetails.fromChainInfo(did);
  return fullDidDetails;
};

const getKeystoreSigner = () => {
  const keystoreSigner: KeystoreSigner = {

    sign: async (signData: KeystoreSigningData<any>) => {
      return {
        alg: signData.alg,
        data: signData.data
      };
    }
  };
  return keystoreSigner;
};

const getKeyPairs = () => {
  const mnemonic = process.env.OWNER_MNEMONIC!;
  const secretKeyPair = sr25519PairFromSeed(mnemonicToMiniSecret(mnemonic));
  const { path } = keyExtractPath('//did//keyAgreement//0');
  const { secretKey } = keyFromPath(secretKeyPair, path, SigningAlgorithms.Sr25519);
  const blake = blake2AsU8a(secretKey);
  const boxPair = naclBoxPairFromSecret(blake);
  return {
    ...boxPair,
    type: 'x25519'
  };
};

export const encryptionKeystore = {
  async encrypt({ data, alg, peerPublicKey }: any) {
    const { secretKey } = getKeyPairs();
    const { sealed, nonce } = naclSeal(
      data,
      secretKey,
      peerPublicKey
    );
    return { data: sealed, alg, nonce };
  },
  async decrypt({ data, alg, nonce, peerPublicKey }: any) {
    const { secretKey } = getKeyPairs();
    const decrypted = naclOpen(
      data,
      nonce,
      peerPublicKey,
      secretKey
    );
    if (!decrypted) throw new Error('Failed to decrypt with given key');
    return { data: decrypted, alg };
  }
};

export const formatDidUri = (did: DidUri) =>
  did.substring(0, 12) +
  '...' +
  did.substring(did.length - 5, did.length - 1);


export function signMessage(message: string) {
  const mnemonic = process.env.OWNER_MNEMONIC!;
  const keyring = new Keyring({ type: 'sr25519' });
  const owner = keyring.addFromMnemonic(mnemonic);
  const signature = owner.sign(message);
  return { message, signature: u8aToHex(signature)} ;
}

export function verifySignedMessage(message: string, signatureHex: string) {
  const mnemonic = process.env.OWNER_MNEMONIC!;
  const keyring = new Keyring({ type: 'sr25519' });
  const owner = keyring.addFromMnemonic(mnemonic);
  const signature = hexToU8a(signatureHex);
  const isValid = owner.verify(message, signature, owner.publicKey);
  return isValid;
}

export {
  getFullDidDetails,
  getKeystoreSigner
};
