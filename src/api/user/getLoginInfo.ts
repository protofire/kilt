import { IGenericResponse } from '../../interfaces/response';
import { apiConfig } from '../config';

export interface ILoginInfo extends IGenericResponse {
  message: string;
  ownerSignature: string;
}

export const getLoginInfo = async () => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/user/login`,
    { headers }
  );
  const result = await response.json();
  return result as ILoginInfo;
};
