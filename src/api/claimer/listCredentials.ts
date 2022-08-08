import { apiConfig } from '../config';

export const onListCredentials = async (did: string) => {
  const { baseUrl } = apiConfig();
  const response = await fetch(`${baseUrl}/api/claimer/credential/${did}`);
  const { data } = await response.json();
  return data;
};
