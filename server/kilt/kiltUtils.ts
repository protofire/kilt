import axios from 'axios';
import { ICredentialEndpointResponse } from '../interfaces/credentialEndpointResponse';
import { 
  Attestation,
  Did,
  DidServiceEndpoint,
  DidUri,
  Credential,
  KeystoreSigningData,
  KeystoreSigner
} from '@kiltprotocol/sdk-js';

/**
 *  set of utilities for handling sdk operations for claims.
 */

class Status {
  static verified = 'verified';
  static unverified = 'unverified';
}

const getFullDidDetails = async (did: DidUri) => {
  const fullDidDetails = await Did.FullDidDetails.fromChainInfo(did);
  return fullDidDetails;
}

const getEndpointsFromDid = async (did: DidUri) => {
  const didDocument = await Did.DidResolver.resolveDoc(did);
  const details = didDocument?.details;
  if (!details) return [];

  const endpoints = details?.getEndpoints();
  return endpoints;
};

const getEndpointResponse = async (endpoint: DidServiceEndpoint) => {
  return axios
    .get<ICredentialEndpointResponse[]>(endpoint.urls[0])
    .then((response) => response.data);
};

const buildCredential = async (endpointData: ICredentialEndpointResponse) => {
  const attestation = await Attestation.query(
    endpointData.credential.rootHash
  );
  if (!attestation) {
    return {
      attesterDid: '',
      label: endpointData.metadata?.label,
      status: Status.unverified
    };
  }

  const credential = Credential.fromRequestAndAttestation(
    endpointData.credential,
    attestation
  );

  return {
    attesterDid: attestation.owner,
    label: endpointData.metadata?.label,
    status: !credential.attestation.revoked
      ? Status.verified
      : Status.unverified
  };
};

const keystoreSigner: KeystoreSigner = {
  sign: async (signData: KeystoreSigningData<any>) => {
    return {
      alg: signData.alg,
      data: signData.data
    }
  }
}

export { getEndpointsFromDid, getEndpointResponse, buildCredential, getFullDidDetails, keystoreSigner };
