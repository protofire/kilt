import { DidResourceUri, DidUri } from '@kiltprotocol/types';

export interface IUser {
  readonly didUri: DidUri;
  readonly signature: string;
  readonly didKeyUri: DidResourceUri;
  readonly web3name: string | null;
  readonly isAttester: boolean;
}
