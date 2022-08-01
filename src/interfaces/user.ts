import { DidResourceUri } from '@kiltprotocol/types';

export interface IUser {
  did: string;
  signature: string;
  didKeyUri: DidResourceUri;
  isAttester: boolean;
}
