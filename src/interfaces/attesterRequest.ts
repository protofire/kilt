import { DidUri } from '@kiltprotocol/sdk-js';

export interface IAttesterRequest {
  readonly _id: string,
  readonly claimerDidUri: DidUri,
  readonly ctypeName: string,
  readonly status: string
}

export interface IAttesterRequestDetail {
  readonly _id: string;
  readonly claimerDidUri: DidUri,
  readonly ctypeName: string,
  readonly terms: string,
  readonly status: string
  readonly form: Record<string, string>
}
