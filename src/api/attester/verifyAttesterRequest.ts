import { DidUri } from '@kiltprotocol/sdk-js';
import { apiConfig } from '../config';

export const verifyAttesterRequest = async (
  credentialId: string,
  did: DidUri
) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/attester/request/verify/${credentialId}/${did}`, {
      method: 'POST',
      headers
    }
  );
  const { success } = await response.json();
  return success as boolean;
};
