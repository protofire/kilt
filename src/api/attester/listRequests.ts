import { IAttesterRequest } from '../../interfaces/attesterRequest';
import { apiConfig } from '../config';

export const onListRequests = async () => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/attester/request`,
    { headers }
  );
  const { data } = await response.json();
  return data as IAttesterRequest[];
};
