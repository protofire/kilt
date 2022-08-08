import { DidUri } from '@kiltprotocol/sdk-js';
import { IAttesterCtype } from '../../interfaces/attester-ctype';
import { apiConfig } from '../config';

export const onListAttesterCtypes = async (didUri: DidUri) => {
  const { baseUrl } = apiConfig();
  const response = await fetch(`${baseUrl}/api/attester/ctypes/${didUri}`);
  const { data } = await response.json();
  return data as IAttesterCtype[];
};
