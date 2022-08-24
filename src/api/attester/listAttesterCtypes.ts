import { DidUri } from '@kiltprotocol/sdk-js';
import { IAttesterCtype } from '../../interfaces/attesterCtype';
import { apiConfig } from '../config';

export const onListAttesterCtypes = async (didUri: DidUri) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/attester/ctypes/${didUri}`,
    { headers }
  );
  const { data } = await response.json();
  return data as IAttesterCtype[];
};
