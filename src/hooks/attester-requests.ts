import { useState } from 'react';
import useUser from './user';

export default function useAttesterRequests() {
  const [ loading, setLoading ] = useState(false);
  const { user } = useUser();
  
  const onLoad = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return [
      {id:1, values: [{value:'0xCase2SD..ASD'},{value: 'CType 1'}, {value: 'Unverified', color: '#CED118'}]},
      {id:2, values: [{value: '0xCase2SD..ASD'},{value: 'CType 1'}, {value: 'Unverified', color: '#CED118'}]},
      {id:3, values: [{value: '0xCase2SD..ASD'},{value: 'CType 1'}, {value: 'Unverified', color: '#CED118'}]},
    ];
  }

  return {
    onLoad,
    loading
  }
}