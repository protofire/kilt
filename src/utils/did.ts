import { DidUri } from '@kiltprotocol/sdk-js';
import { IUser } from '../interfaces/user';

export const formatDidUri = (didUri: DidUri | string) => {
  if (!didUri) return '';
  const did = didUri.split('#')[0];
  const prefix = did.substring(0, 12);
  const suffix = did.substring(did.length - 5, did.length);
  return `${prefix} ... ${suffix}`;
};

export const getDisplayName = (user: IUser) => {
  return user.web3name ?? formatDidUri(user.didUri);
};

export const isValidDid = (input: string | undefined) => {
  if (!input) return false;
  const regex = /^(did:kilt:[a-zA-Z0-9]{48})$/;
  return regex.test(input);
};
