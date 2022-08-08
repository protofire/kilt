import { IAttesterCtype } from '../../interfaces/attesterCtype';
import { apiConfig } from '../config';

export const onLoadAttesterCtype = async (id: string) => {
  const { baseUrl } = apiConfig();
  const response = await fetch(`${baseUrl}/api/claimer/attesters/detail/${id}`);
  const { data } = await response.json();
  return data as IAttesterCtype;
};
