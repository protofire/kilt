import { DidUri } from '@kiltprotocol/sdk-js';
import { IAttesterCtype } from '../../interfaces/attester-ctype';
import { apiConfig } from '../config';

export const submitClaim = async (
  claimerDidUri: DidUri,
  attesterCtype: IAttesterCtype,
  form: any
) => {
  const { baseUrl } = apiConfig();
  const response = await fetch(`${baseUrl}/api/claimer/attesters/request/`, {
    method: 'POST',
    body: JSON.stringify({ claimerDidUri, attesterCtype, form }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });
  const { success } = await response.json();
  return success as boolean;
};
