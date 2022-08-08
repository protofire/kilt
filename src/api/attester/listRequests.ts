import { DidUri } from '@kiltprotocol/sdk-js';
import { IAttesterRequest } from '../../interfaces/attesterRequest';
import { apiConfig } from '../config';

export const onListRequests = async (didUri: DidUri) => {
  const { baseUrl } = apiConfig();
  const response = await fetch(`${baseUrl}/api/attester/request/${didUri}`);
  const { data } = await response.json();
  return data as IAttesterRequest[];
};
