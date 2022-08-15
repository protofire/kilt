import { DidUri } from '@kiltprotocol/sdk-js';

export interface IAttesterRequest {
  readonly _id: string,
  readonly claimerDid: DidUri,
  readonly ctypeName: string,
  readonly ctypeId: string,
  readonly status: string
}

export interface IAttesterRequestDetail {
  readonly _id: string;
  readonly claimerDid: DidUri,
  readonly claimerWeb3name: string,
  readonly attesterDid: string,
  readonly attesterWeb3name: string,
  readonly ctypeName: string,
  readonly terms: string,
  readonly status: string
  readonly form: Record<string, string>
}
