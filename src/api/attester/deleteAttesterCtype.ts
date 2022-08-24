import { DidUri } from '@kiltprotocol/sdk-js';
import { apiConfig } from '../config';

export const onDeleteAttesterCtype = async (didUri: DidUri, ctypeId: string) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/attester/ctypes/${didUri}/${ctypeId}`, {
      method: 'DELETE',
      headers
    });
  const { success } = await response.json();
  return success as boolean;
};
