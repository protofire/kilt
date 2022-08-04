import axios from 'axios';
import { ICredentialEndpointResponse } from '../interfaces/credentialEndpointResponse';
import { Attestation, Did, DidServiceEndpoint, DidUri, Credential } from '@kiltprotocol/sdk-js';

/**
 *  set of utilities for handling sdk operations for claims.
 */

class Status {
  static verified = 'verified';
  static unverified = 'unverified';
}

const getEndpointsFromDid = async (did: DidUri) => {
  const didDocument = await Did.DidResolver.resolveDoc(did as DidUri);
  const endpoints = didDocument?.details?.getEndpoints();
  return endpoints;
};

const getEndpointResponse = async (endpoint: DidServiceEndpoint) => {
  return axios
    .get<ICredentialEndpointResponse[]>(endpoint.urls[0])
    .then((response) => response.data);
};

const buildCredential = async (endpointData: ICredentialEndpointResponse) => {
  const attestation = await Attestation.query(endpointData.credential.rootHash);
  if (!attestation) {
    return {
      attesterDid: '',
      label: endpointData.metadata?.label,
      status: Status.unverified
    };
  }
  const credential = Credential.fromRequestAndAttestation(endpointData.credential, attestation);
  const isVerified = await credential.verify();
  return {
    attesterDid: attestation.owner,
    label: endpointData.metadata?.label,
    status: isVerified ? Status.verified : Status.unverified
  };
};

export { getEndpointsFromDid, getEndpointResponse, buildCredential };
