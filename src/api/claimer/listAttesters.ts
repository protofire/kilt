import { DidUri } from '@kiltprotocol/sdk-js';
import { IAttesterCtype } from '../../interfaces/attesterCtype';
import { apiConfig } from '../config';

export const onListAttesters = async (didUri: DidUri) => {
  const { baseUrl } = apiConfig();
  const response = await fetch(`${baseUrl}/api/claimer/attesters/${didUri}`);
  const { data } = await response.json();
  return data as IAttesterCtype[];
};
