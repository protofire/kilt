import {
  Did,
  DidUri,
  IIdentity,
  KeyringPair,
  KeystoreSigner,
  BlockchainUtils,
  KeystoreSigningData,
  SubmittableExtrinsic,
  ISubmittableResult
} from '@kiltprotocol/sdk-js';

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

export const formatDidUri = (did: DidUri) =>
  did.substring(0, 12) +
  '...' +
  did.substring(did.length - 5, did.length - 1);

export {
  getFullDidDetails,
  getKeystoreSigner
};
