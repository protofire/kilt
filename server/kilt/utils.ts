import { Did, DidUri, KeystoreSigner, KeystoreSigningData } from '@kiltprotocol/sdk-js';

const getFullDidDetails = async (did: DidUri) => {
  const fullDidDetails = await Did.FullDidDetails.fromChainInfo(did);
  return fullDidDetails;
};

const keystoreSigner: KeystoreSigner = {
  sign: async (signData: KeystoreSigningData<any>) => {
    return {
      alg: signData.alg,
      data: signData.data
    };
  }
};

export {
  getFullDidDetails,
  keystoreSigner
};
