import { IRequestForAttestation } from '@kiltprotocol/sdk-js';

interface IMetadataDetial {
  label: string;
}

export interface ICredentialEndpointResponse {
  credential: IRequestForAttestation;
  metadata: IMetadataDetial;
}

export interface ICredentialByDidResponse {
  attesterDid: string,
  label: string,
  status: string
}
