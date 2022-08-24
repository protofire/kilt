import { DidUri } from '@kiltprotocol/sdk-js';
import { IAttesterRequestDetail } from '../../interfaces/attesterRequest';
import { apiConfig } from '../config';

export const onLoadRequest = async (id: string, did: DidUri) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/attester/request/detail/${id}/${did}`,
    { headers }
  );
  const { data } = await response.json();
  return data as IAttesterRequestDetail;
};
