import { apiConfig } from '../config';

export interface ILoginInfo {
  message: string;
}

export const getLoginInfo = async () => {
  const { baseUrl } = apiConfig();
  const response = await fetch(`${baseUrl}/api/user/login`);
  const { data } = await response.json();
  return data as ILoginInfo;
};
