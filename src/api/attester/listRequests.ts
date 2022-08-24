import { DidUri } from '@kiltprotocol/sdk-js';
import { IAttesterRequest } from '../../interfaces/attesterRequest';
import { apiConfig } from '../config';

export const onListRequests = async (didUri: DidUri) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/attester/request/${didUri}`,
    { headers }
  );
  const { data } = await response.json();
  return data as IAttesterRequest[];
};
