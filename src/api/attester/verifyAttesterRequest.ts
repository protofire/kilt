import { apiConfig } from '../config';

export const verifyAttesterRequest = async (
  credentialId: string
) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/attester/request/verify/${credentialId}`, {
      method: 'POST',
      headers
    }
  );
  const { success } = await response.json();
  return success as boolean;
};
