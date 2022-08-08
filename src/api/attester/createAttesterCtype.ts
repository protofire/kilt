import { IAttesterCtype } from '../../interfaces/attesterCtype';
import { apiConfig } from '../config';

export const createAttesterCtype = async (ctype: IAttesterCtype) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(`${baseUrl}/api/attester/ctypes`, {
    method: 'POST',
    body: JSON.stringify(ctype),
    headers
  });
  const { success } = await response.json();
  return success as boolean;
};
