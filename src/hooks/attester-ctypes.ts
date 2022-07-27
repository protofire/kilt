import { useState } from 'react';
import useUser from './user';

export default function useAttesterCtypes() {
  const [ loading, setLoading ] = useState(false);
  const { user } = useUser();

  // Load CType quotes
  const onLoad = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return [
      {id: 1, values: [{value: 'CType 1'}, {value:'30 KILT'}]},
      {id: 2, values: [{value: 'CType 2'}, {value:'10 KILT'}]},
      {id: 3, values: [{value: 'CType 3'}, {value: '12 kilt'}]},
    ];
  }

  // Delete the CType quote
  const onDelete = async (id: number) => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    console.log('deleting id:', id, ' fromuser:', user);
    throw Error('not implemented');
  }

  return {
    onLoad,
    onDelete,
    loading
  }
}