import { apiConfig } from '../config';

export const onListCredentials = async (did: string) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/claimer/credential/${did}`,
    { headers }
  );
  const { data } = await response.json();
  return data;
};
