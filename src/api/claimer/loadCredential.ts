import { IAttestedCredential } from '../../interfaces/credential';
import { apiConfig } from '../config';

export const onLoadCredential = async (id: string) => {
  const { baseUrl } = apiConfig();
  const response = await fetch(`${baseUrl}/api/claimer/credential/detail/${id}`);
  const { data } = await response.json();
  return data as IAttestedCredential;
};
