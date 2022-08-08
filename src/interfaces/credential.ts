import { DidUri } from '@kiltprotocol/sdk-js';

export interface ICredential {
  readonly id?: string;
  readonly attesterName?: string;
  readonly attesterDidUri: DidUri;
  readonly label: string;
  readonly status: string;
}

export interface IAttestedCredential {
  readonly id: string;
  readonly attesterName: string;
  readonly attesterDidUri: DidUri;
  readonly ctypeName: string;
  readonly claimerText: string;
  readonly status: string;
  readonly terms: string;
}
