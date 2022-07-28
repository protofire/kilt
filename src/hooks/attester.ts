import { useState } from 'react';
import { Status, statusInfo } from '../constants/claim-status';
import useUser from './user';

export default function useAttester() {
  const [ loading, setLoading ] = useState(false);
  const { user } = useUser();

  const onListCtypes = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return [
      {id: 1, values: [{value: 'CType 1'}, {value: '30 KILT'}]},
      {id: 2, values: [{value: 'CType 2'}, {value: '10 KILT'}]},
      {id: 3, values: [{value: 'CType 3'}, {value: '12 kilt'}]},
    ];
  }

  // Delete the CType quote
  const onDeleteCtype = async (id: number) => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    console.log('deleting id:', id, ' fromuser:', user);
    throw Error('not implemented');
  }

  const getValueByStatus = (current: number) => ({
    value: statusInfo[current].label, 
    color: statusInfo[current].color
  });
  
  const onListRequests = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return [
      {id:1, values: [{value: '0xCase2SD..ASD'},{value: 'CType 1'}, getValueByStatus(Status.VERIFIED)]},
      {id:2, values: [{value: '0xCase2SD..ASD'},{value: 'CType 1'}, getValueByStatus(Status.PENDING_PAYMENT)]},
      {id:3, values: [{value: '0xCase2SD..ASD'},{value: 'CType 1'}, getValueByStatus(Status.UNVERIFIED)]},
    ];
  }

  const onLoadRequest = async (id: number) => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return {
      id: id,
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
  }

  return {
    onListCtypes,
    onDeleteCtype,
    onListRequests,
    onLoadRequest,
    loading
  }
}