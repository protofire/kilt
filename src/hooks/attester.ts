import { DidUri } from '@kiltprotocol/sdk-js';
import { useState } from 'react';
import { statusToCeil } from '../constants/claim-status';

export default function useAttester() {
  const [ loading, setLoading ] = useState(false);

  const endpoint = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:8000';

  const onDeleteAttesterCtype = async (didUri: DidUri, ctypeId: string) => {
    setLoading(true);
    const response = await fetch(
      `${endpoint}/api/attester/ctypes/${didUri}/${ctypeId}`, {
        method: 'DELETE'
      });
    const { success } = await response.json();
    setLoading(false);
    return success as boolean;
  };

  // List the requests created by claimers for
  // attestation.
  const onListRequests = async () => {
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

  const checkDidAttester = async (didUri: DidUri) => {
    const response = await fetch(`${endpoint}/api/attester/isAttester/${didUri}`);
    const { data } = await response.json();
    return data?.isAttester;
  };

  return {
    onDeleteAttesterCtype,
    onListRequests,
    onLoadRequest,
    checkDidAttester,
    loading
  };
}
