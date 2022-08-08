import { DidResourceUri, DidUri } from '@kiltprotocol/types';

export interface IUser {
  readonly didUri: DidUri;
  readonly signature: string;
  readonly didKeyUri: DidResourceUri;
  readonly isAttester: boolean;
}
