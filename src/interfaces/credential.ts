import { DidUri } from '@kiltprotocol/sdk-js';

export interface ICredential {
  readonly _id?: string;
  readonly attesterWeb3name?: string;
  readonly attesterDidUri: DidUri;
  readonly label: string;
  readonly status: string;
}

export interface IAttestedCredential {
  readonly id: string;
  readonly attesterWeb3name: string;
  readonly claimerWeb3name: string;
  readonly attesterDid: DidUri;
  readonly claimerDid: DidUri;
  readonly ctypeName: string;
  readonly claimerText: string;
  readonly status: string;
  readonly terms: string;
  readonly quote: number;
}
