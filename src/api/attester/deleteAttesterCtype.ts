import { apiConfig } from '../config';

export const onDeleteAttesterCtype = async (ctypeId: string) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/attester/ctypes/${ctypeId}`, {
      method: 'DELETE',
      headers
    });
  const { success } = await response.json();
  return success as boolean;
};
