import { DidUri } from '@kiltprotocol/sdk-js';

export const formatDidUri = (did: DidUri) =>
  did.substring(0, 12) + '...' + did.substring(did.length - 5, did.length - 1);
