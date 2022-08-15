import { DidUri } from '@kiltprotocol/sdk-js';
import { IUser } from '../interfaces/user';

export const formatDidUri = (did: DidUri) =>
  did.substring(0, 12) +
  '...' +
  did.substring(did.length - 5, did.length - 1);

export const getDisplayName = (user: IUser) => {
  return user.web3name ?? formatDidUri(user.didUri);
};
