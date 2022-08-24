import { DidUri } from '@kiltprotocol/sdk-js';
import { IAttesterCtype } from '../../interfaces/attesterCtype';
import { apiConfig } from '../config';

export const createCredential = async (
  claimerDidUri: DidUri,
  claimerWeb3name: string | null,
  attesterCtype: IAttesterCtype,
  form: string
) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(`${baseUrl}/api/claimer/credential`, {
    method: 'POST',
    body: JSON.stringify({
      claimerDidUri,
      claimerWeb3name,
      attesterCtype,
      form
    }),
    headers
  });
  const { success } = await response.json();
  return success as boolean;
};
