import { DidUri } from '@kiltprotocol/types';

export interface IUser {
  readonly didUri: DidUri;
  readonly web3name: string | null;
  readonly isAttester: boolean;
}
