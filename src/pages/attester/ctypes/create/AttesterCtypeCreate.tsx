import { ICTypeSchema } from '@kiltprotocol/sdk-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAttester from '../../../../hooks/attester';
import useUser from '../../../../hooks/user';

function AttesterCtypeCreate() {
  const { user } = useUser();
  const { createAttesterCtype, onListCtypes } = useAttester();
  const navigate = useNavigate();

  const [ctypes, setCtypes] = useState<ICTypeSchema[]>([]);
  const [selectedCtypeId, setSelectedCtypeId] = useState<string | null>(null);
  const [quote, setQuote] = useState<number>();
  const [terms, setTerms] = useState<string>();

  useEffect(() => {
    if (!user) return;
    onListCtypes(user.did).then(setCtypes);
  }, [ user ]);

  const onSubmit = async () => {
    const attesterDid = user?.did;
    const selectedCtype = ctypes.find(c => c.$id === selectedCtypeId);
    if (!selectedCtypeId || !selectedCtype || !quote || !terms || !attesterDid) return;

    const success = await createAttesterCtype({
      ctypeId: selectedCtypeId,
      ctypeName: selectedCtype.title,
      quote,
      terms,
      attesterDid
    });
    if (success) navigate(-1);
  };

  return (
    <div className='wrapper'>
      <div className='center'>
        <div className='column'>
          <span className='title'>Create quote for CType</span>
          <select onChange={(e) => setSelectedCtypeId(e.target.value)}>
            {ctypes.map(c =>
              <option key={c.$id} value={c.$id}>{c.title}</option>)}
          </select>
          <input
            type="number"
            onChange={e => setQuote(Number(e.target.value))}
            placeholder='Quote (KILT)' />
          <textarea
            placeholder='Terms and Conditions'
            onChange={e => setTerms(e.target.value)}
            cols={40}
            rows={5}/>
          <button className='primary' onClick={onSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default AttesterCtypeCreate;
