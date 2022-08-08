import { DidUri } from '@kiltprotocol/sdk-js';
import { useState } from 'react';
import { IAttesterCtype } from '../interfaces/attester-ctype';
import { IAttestedCredential } from '../interfaces/credential';

export default function useClaimer() {
  const [ loading, setLoading ] = useState(false);

  const endpoint = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:8000';

  // list all the credentials for the claimer.
  const onListCredentials = async (did: string) => {
    setLoading(true);
    const response = await fetch(`${endpoint}/api/claimer/credential/${did}`);
    const { data } = await response.json();
    setLoading(false);
    return data;
  };

  // load credential details for claimer
  const onLoadCredential = async (id: number) => {
    /* get credential details for claimer
     * method: GET
     * endpoint: /claimer/credential/:claimer_address/:credential_id
     * returns: {
     *  id: number,
     *  ctypeName: string,
     *  attesterAddress: string,
     *  status: string,
     *  terms: string,
     *  claimerText: string,
     *  files: [{name: string, url: string}, ...]
     * }
     */
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return {
      id: 'someid',
      attesterDidUri: 'kilt:did:...' as DidUri,
      attesterName: 'Attester 1',
      ctypeName: 'CType 1',
      status: 'verified',
      terms: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore 
        magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat.`,
      claimerText: 'some text from claimer'
    } as IAttestedCredential;
  };

  // list all the attesters for claimer
  const onListAttesters = async (didUri: DidUri) => {
    setLoading(true);
    const response = await fetch(`${endpoint}/api/claimer/attesters/${didUri}`);
    const { data } = await response.json();
    setLoading(false);
    return data as IAttesterCtype[];
  };

  // load the attester ctype details for claimer
  const onLoadAttesterCtype = async (id: string) => {
    setLoading(true);
    const response = await fetch(`${endpoint}/api/claimer/attesters/detail/${id}`);
    const { data } = await response.json();
    setLoading(false);
    return data as IAttesterCtype;
  };

  // creates a new claim request for the attesters
  const submitClaim = async (
    claimerDidUri: DidUri,
    attesterCtype: IAttesterCtype,
    form: any
  ) => {
    setLoading(true);
    const response = await fetch(`${endpoint}/api/claimer/attesters/request/`, {
      method: 'POST',
      body: JSON.stringify({ claimerDidUri, attesterCtype, form }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    const { success } = await response.json();
    setLoading(false);
    return success as boolean;
  };

  return {
    onListCredentials,
    onListAttesters,
    onLoadAttesterCtype,
    onLoadCredential,
    submitClaim,
    loading
  };
}
