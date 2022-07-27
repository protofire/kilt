import { useState } from 'react';
import { statusInfo, Status } from '../constants/claim-status';
import useUser from './user'; 

export default function useClaimer() {
  const [ loading, setLoading ] = useState(false);
  const { user } = useUser();

  const getValueByStatus = (current: number) => ({
    value: statusInfo[current].label, 
    color: statusInfo[current].color
  });
  
  const onLoadCredentials = async () => {
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

  const onLoadAttesters = async () => {
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

  return {
    onLoadCredentials,
    onLoadAttesters,
    loading
  }
}