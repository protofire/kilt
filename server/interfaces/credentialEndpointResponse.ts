import { IRequestForAttestation } from '@kiltprotocol/sdk-js';

interface IMetadataDetial {
  readonly label: string;
}

export interface ICredentialEndpointResponse {
  readonly credential: Readonly<IRequestForAttestation>;
  readonly metadata: Readonly<IMetadataDetial>;
}

export interface ICredentialByDidResponse {
  readonly attesterDidUri: string,
  readonly label: string,
  readonly status: string
}
