import { apiConfig } from '../config';

export const onListCredentials = async () => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/claimer/credential`,
    { headers }
  );
  const { data } = await response.json();
  return data;
};
