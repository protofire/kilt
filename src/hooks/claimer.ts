import { ICredential } from '@kiltprotocol/sdk-js';
import { useState } from 'react';
import { statusInfo, Status } from '../constants/claim-status';
import { IAttester } from '../interfaces/attester-ctype';
import useUser from './user'; 

export default function useClaimer() {
  const [ loading, setLoading ] = useState(false);
  const { user } = useUser();

  const getStatusByName = (name: string) => {
    Object.keys(statusInfo).find(key => key === name);
  };

  const getValueByStatus = (current: number) => ({
    value: statusInfo[current].label, 
    color: statusInfo[current].color
  });
  
  const onListCredentials = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return [
      {id: 1, values: [{value:'CType 1'}, {value:'Attester 1'}, getValueByStatus(Status.VERIFIED)]},
      {id: 2, values: [{value:'CType 2'}, {value:'Attester 2'}, getValueByStatus(Status.VERIFIED)]},
      {id: 3, values: [{value:'CType 3'}, {value:'Attester 3'}, getValueByStatus(Status.VERIFIED)]},
    ];
  }

  const onLoadCredential = async (id: number) => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return {
      id: id, 
      attester: 'Attester 1',
      ctype: 'CType 1',
      status: 'verified',
      terms: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore 
        magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat.`,
      claimerText: 'some text from claimer',
      files: ['file1.jpeg', 'some_other_file.png', 'file3.pdf']
    };
  }

  const onListAttesters = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return [
      {id: 1, values: [{value:'Attester 1'}, {value:'CType 1'}, {value:'30 KILT'}]},
      {id: 2, values: [{value:'Attester 2'}, {value:'CType 2'}, {value:'20 KILT'}]},
      {id: 3, values: [{value:'Attester 3'}, {value:'CType 3'}, {value:'25 KILT'}]},
    ]
  }


  const onLoadAttesterCtype = async (id: number) => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return { 
      terms: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore 
          magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea 
          commodo consequat.`,
      name: `Attester ${id}`
    };
  }

  const submitClaim = async (text: string, files: FileList | null) => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return { success: true };
  }


  return {
    onListCredentials,
    onListAttesters,
    onLoadAttesterCtype,
    onLoadCredential,
    submitClaim,
    loading
  }
}