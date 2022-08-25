import { IAttesterCtype } from '../../interfaces/attesterCtype';
import { apiConfig } from '../config';

export const onListAttesterCtypes = async () => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/attester/ctypes`,
    { headers }
  );
  const { data } = await response.json();
  return data as IAttesterCtype[];
};
