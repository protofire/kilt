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

  return {
    onLoadCredentials,
    loading
  }
}