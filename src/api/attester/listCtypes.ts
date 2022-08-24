import { DidUri, ICType } from '@kiltprotocol/sdk-js';
import { apiConfig } from '../config';

export const onListCtypes = async (didUri: DidUri) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/attester/ctypes/all/${didUri}`,
    { headers }
  );
  const { data } = await response.json();
  return data as ICType[];
};
