import { DidUri } from '@kiltprotocol/sdk-js';
import { apiConfig } from '../config';

export const checkDidAttester = async (didUri: DidUri) => {
  const { baseUrl } = apiConfig();
  const response = await fetch(`${baseUrl}/api/attester/isAttester/${didUri}`);
  const { data } = await response.json();
  return data?.isAttester;
};
