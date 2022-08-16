import { DidUri } from '@kiltprotocol/sdk-js';
import { apiConfig } from '../config';

interface IResponseData {
  isAttester: boolean;
  web3name: string;
}

export const getUserDetails = async (didUri: DidUri) => {
  const { baseUrl } = apiConfig();
  const response = await fetch(`${baseUrl}/api/user/details/${didUri}`);
  const { data } = await response.json();
  return {
    isAttester: data.isAttester,
    web3name: data.web3name
  } as IResponseData;
};
