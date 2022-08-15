import { DidUri } from '@kiltprotocol/sdk-js';
import { IAttesterCtype } from '../../interfaces/attesterCtype';
import { apiConfig } from '../config';

export const createCredential = async (
  claimerDidUri: DidUri,
  claimerWeb3name: string | null,
  attesterCtype: IAttesterCtype,
  form: any
) => {
  const { baseUrl } = apiConfig();
  const response = await fetch(`${baseUrl}/api/credential/`, {
    method: 'POST',
    body: JSON.stringify({
      claimerDidUri,
      claimerWeb3name,
      attesterCtype,
      form
    }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const { success } = await response.json();
  return success as boolean;
};
