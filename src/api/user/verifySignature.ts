import { apiConfig } from '../config';

export const verifySignature = async (message: string, signature: string, keyUri: string) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(`${baseUrl}/api/user/verify`, {
    method: 'POST',
    body: JSON.stringify({ message, signature, keyUri }),
    headers
  });
  const result = await response.json();
  return result;
};
