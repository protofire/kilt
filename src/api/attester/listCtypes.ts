import { DidUri, ICTypeSchema } from '@kiltprotocol/sdk-js';
import { apiConfig } from '../config';

export const onListCtypes = async (didUri: DidUri) => {
  const { baseUrl } = apiConfig();
  const response = await fetch(`${baseUrl}/api/attester/ctypes/all/${didUri}`);
  const { data } = await response.json();
  return data as ICTypeSchema[];
};
