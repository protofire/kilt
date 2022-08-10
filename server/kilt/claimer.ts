import axios from 'axios';
import { ICredentialEndpointResponse } from '../interfaces/credential';
import {
  Attestation,
  Did,
  DidServiceEndpoint,
  DidUri,
  Credential,
  CType,
  Claim,
  RequestForAttestation,
  ICTypeSchema
} from '@kiltprotocol/sdk-js';
import { UUID } from '@kiltprotocol/utils';
import { FullDidDetails } from '@kiltprotocol/did';
import { Status } from '../constants/status.enum';
import { getKeystoreSigner } from './utils';

/**
 *  set of utilities for handling sdk operations for claims.
 */

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
      attesterDidUri: '',
      label: endpointData.metadata?.label,
      status: Status.unverified
    };
  }

  const credential = Credential.fromRequestAndAttestation(
    endpointData.credential,
    attestation
  );

  return {
    attesterDidUri: attestation.owner,
    label: endpointData.metadata?.label,
    status: !credential.attestation.revoked
      ? Status.verified
      : Status.unverified
  };
};

const createClaim = (
  ctypeSchema: ICTypeSchema,
  fullDidDetails: FullDidDetails,
  form: any = {}
) => {
  const ctype = CType.fromSchema(ctypeSchema, fullDidDetails.uri);
  const claim = Claim.fromCTypeAndClaimContents(ctype, form, fullDidDetails.uri);
  return claim;
};

const createRequest = async (
  claim: Claim,
  fullDidDetails: FullDidDetails
) => {
  const requestForAttestation = RequestForAttestation.fromClaim(claim);
  const keystoreSigner = getKeystoreSigner();

  const signedRequest = await requestForAttestation.signWithDidKey(
    keystoreSigner,
    fullDidDetails,
    fullDidDetails?.authenticationKey.id,
    { challenge: UUID.generate() }
  );
  return signedRequest;
};

export {
  getEndpointsFromDid,
  getEndpointResponse,
  buildCredential,
  createRequest,
  createClaim
};
