import { apiConfig } from '../config';

export interface ISessionInfo {
  sessionId: string;
  dappName: string;
  dAppEncryptionKeyUri: string;
  challenge: string;
}

export const getSessionInfo = async () => {
  const { baseUrl } = apiConfig();
  const response = await fetch(`${baseUrl}/api/user/session`);
  const { data } = await response.json();
  return data as ISessionInfo;
};
