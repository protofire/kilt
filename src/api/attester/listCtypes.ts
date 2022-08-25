import { ICType } from '@kiltprotocol/sdk-js';
import { apiConfig } from '../config';

export const onListCtypes = async () => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/attester/ctypes/all`,
    { headers }
  );
  const { data } = await response.json();
  return data as ICType[];
};
