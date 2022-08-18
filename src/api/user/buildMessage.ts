import { IEncryptedMessage } from '@kiltprotocol/sdk-js';
import { apiConfig } from '../config';

interface IMessageResponse {
  message: IEncryptedMessage;
}

export const buildMessage = async (encryptionKeyId: string) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(`${baseUrl}/api/user/message`, {
    method: 'POST',
    body: JSON.stringify({
      encryptionKeyId
      // challenge,
      // nonce
    }),
    headers
  });
  const { data } = await response.json();
  return data as IMessageResponse;
};
