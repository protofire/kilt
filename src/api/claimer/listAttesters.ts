import { IAttesterCtype } from '../../interfaces/attesterCtype';
import { apiConfig } from '../config';

export const onListAttesters = async () => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/claimer/attesters`,
    { headers }
  );
  const { data } = await response.json();
  return data as IAttesterCtype[];
};
