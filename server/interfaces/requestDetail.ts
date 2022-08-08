import { DidUri } from '@kiltprotocol/sdk-js';

export interface IRequestDetailResponse {
  readonly _id: string,
  readonly claimerDidUri: DidUri | string,
  readonly ctypeName: string,
  readonly terms: string,
  readonly form: Record<string, any>,
  readonly status: string
}
