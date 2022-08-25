import { IAttesterRequestDetail } from '../../interfaces/attesterRequest';
import { apiConfig } from '../config';

export const onLoadRequest = async (id: string) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/attester/request/detail/${id}`,
    { headers }
  );
  const { data } = await response.json();
  return data as IAttesterRequestDetail;
};
