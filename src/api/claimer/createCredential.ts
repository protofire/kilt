import { IAttesterCtype } from '../../interfaces/attesterCtype';
import { apiConfig } from '../config';

export const createCredential = async (
  attesterCtype: IAttesterCtype,
  form: string
) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(`${baseUrl}/api/claimer/credential`, {
    method: 'POST',
    body: JSON.stringify({
      attesterCtype,
      form
    }),
    headers
  });
  const { success } = await response.json();
  return success as boolean;
};
