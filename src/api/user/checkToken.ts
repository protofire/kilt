import { apiConfig } from '../config';

export const checkToken = async (token: string) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/user/check/${token}`,
    { headers }
  );
  const result = await response.json();
  return result.success as boolean;
};
