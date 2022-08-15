import { DidUri } from '@kiltprotocol/sdk-js';
import { IUser } from '../interfaces/user';

export const formatDidUri = (did: DidUri) =>
  did.substring(0, 12) +
  '...' +
  did.substring(did.length - 5, did.length - 1);

export const getDisplayName = (user: IUser) => {
  return user.web3name ?? formatDidUri(user.didUri);
};

export const isValidDid = (input: string | undefined) => {
  if (!input) return false;
  const regex = /^(did:kilt:[a-zA-Z0-9]{48})$/;
  return regex.test(input);
};
