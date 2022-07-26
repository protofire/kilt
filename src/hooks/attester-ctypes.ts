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
      {id: 1, values: ['CType 1', '30 KILT']},
      {id: 2, values: ['CType 2', '10 KILT']},
      {id: 3, values: ['CType 3', '12 kilt']},
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