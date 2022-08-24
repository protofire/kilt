import { DidUri } from '@kiltprotocol/sdk-js';
import { IAttesterCtype } from '../../interfaces/attesterCtype';
import { apiConfig } from '../config';

export const onListAttesters = async (didUri: DidUri) => {
  const { baseUrl, headers } = apiConfig();
  const response = await fetch(
    `${baseUrl}/api/claimer/attesters/${didUri}`,
    { headers }
  );
  const { data } = await response.json();
  return data as IAttesterCtype[];
};
