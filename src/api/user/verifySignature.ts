import { IGenericResponse } from '../../interfaces/response';
import { apiConfig } from '../config';

export interface IVerifiedUser extends IGenericResponse {
  token: string;
}

export const verifySignature = async (
  message: string,
  ownerSignature: string,
  didSignature: string,
  keyUri: string
) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(`${baseUrl}/api/user/verify`, {
    method: 'POST',
    body: JSON.stringify({
      message,
      ownerSignature,
      didSignature,
      keyUri
    }),
    headers
  });
  const result = await response.json() as IVerifiedUser;
  return result;
};
