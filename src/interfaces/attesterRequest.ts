import { DidUri } from '@kiltprotocol/sdk-js';

export interface IAttesterRequest {
  readonly _id: string,
  readonly claimerDidUri: DidUri,
  readonly ctypeName: string,
  readonly status: string
}
