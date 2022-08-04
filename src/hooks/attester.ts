import { useState } from 'react';
import { statusToCeil } from '../constants/claim-status';
import { IAttesterCtype } from '../interfaces/attester-ctype';

export default function useAttester() {
  const [ loading, setLoading ] = useState(false);

  const endpoint = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:8000';

  const createCtype = async (ctype: IAttesterCtype) => {
    setLoading(true);
    const response = await fetch(`${endpoint}/api/attester/ctypes`, {
      method: 'POST',
      body: JSON.stringify(ctype)
    });
    const { success } = await response.json();
    setLoading(false);
    return success as boolean;
  };

  // List all the CTypes with Quotes that the
  // attester is allowed to verify.
  const onListCtypes = async (did: string) => {
    setLoading(true);
    const response = await fetch(`${endpoint}/api/attester/ctypes/${did}`);
    const { data } = await response.json();
    setLoading(false);
    return data as IAttesterCtype[];
  };

  // Delete the CType quote for the attester.
  const onDeleteCtype = async (id: string | number) => {
    /* Delete ctype for attester
     * method: DELETE
     * endpoint: /attester/ctyes/:attester_address/:ctype_id
     * returns: -
     */
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    throw Error('not implemented');
  };

  // List the requests created by claimers for
  // attestation.
  const onListRequests = async () => {
    /* uses the attester address to fetch the claim requests in real time.
     * method: Web socket - pub/sub connection
     * endpoint: /attester/request/:attester_address
     * returns:
     * [{
     *  id: number,
     *  claimer_address: string,
     *  ctype_name: string,
     *  status: string
     * }, ...]
     */
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return [
      { id: 1, values: [{ value: '0xCase2SD..ASD' }, { value: 'CType 1' }, statusToCeil.verified] },
      { id: 2, values: [{ value: '0xCase2SD..ASD' }, { value: 'CType 1' }, statusToCeil.pending_payment] },
      { id: 3, values: [{ value: '0xCase2SD..ASD' }, { value: 'CType 1' }, statusToCeil.unverified] }
    ];
  };

  // Loads detailed information about
  // the claim request for attestation
  const onLoadRequest = async (id: number) => {
    /*
     * method: GET
     * endpoint: /attester/request/:claim_id
     * returns: {
     *  id: number,
     *  claimerAddress: string,
     *  status: string,
     *  ctypeName: string,
     *  ctypeTerms: string,
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
      id,
      address: '0xCase2SD..ASD',
      status: 'unverified',
      ctype: 'CType 1',
      terms: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore 
        magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat.`,
      claimerText: 'some text from claimer',
      files: ['file1.png', 'file2.jpeg', 'file3.pdf']
    };
  };

  const checkDidAttester = async (did: string) => {
    const response = await fetch(`${endpoint}/api/attester/isAttester/${did}`);
    const { data } = await response.json();
    return data?.isAttester;
  };

  return {
    createCtype,
    onListCtypes,
    onDeleteCtype,
    onListRequests,
    onLoadRequest,
    checkDidAttester,
    loading
  };
}
