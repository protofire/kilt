import { useState } from 'react';
import { statusInfo, Status } from '../constants/claim-status';
import useUser from './user'; 



export default function useAttesterRequests() {
  const [ loading, setLoading ] = useState(false);
  const { user } = useUser();

  const getValueByStatus = (current: number) => ({
    value: statusInfo[current].label, 
    color: statusInfo[current].color
  });
  
  const onLoad = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return [
      {id:1, values: [{value:'0xCase2SD..ASD'},{value: 'CType 1'}, getValueByStatus(Status.VERIFIED)]},
      {id:2, values: [{value: '0xCase2SD..ASD'},{value: 'CType 1'}, getValueByStatus(Status.PENDING_PAYMENT)]},
      {id:3, values: [{value: '0xCase2SD..ASD'},{value: 'CType 1'}, getValueByStatus(Status.UNVERIFIED)]},
    ];
  }

  return {
    onLoad,
    loading
  }
}