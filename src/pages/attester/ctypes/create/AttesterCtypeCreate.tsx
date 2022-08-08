import { ICTypeSchema } from '@kiltprotocol/sdk-js';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAttesterCtype } from '../../../../api/attester/createAttesterCtype';
import { onListCtypes } from '../../../../api/ctypes/listCtypes';
import useUser from '../../../../hooks/user';

function AttesterCtypeCreate() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [ctypes, setCtypes] = useState<ICTypeSchema[]>([]);
  const [selectedCtypeId, setSelectedCtypeId] = useState<string | null>(null);
  const [quote, setQuote] = useState<number>();
  const [terms, setTerms] = useState<string>();

  useEffect(() => {
    user && onListCtypes(user.didUri).then(setCtypes);
  }, [ user ]);

  const handleCtypeChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCtypeId(e.target.value);
  };

  const handleQuoteChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setQuote(Number(e.target.value));
  };

  const handleTermsChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTerms(e.target.value);
  };

  const onSubmit = async () => {
    const selectedCtype = ctypes.find(c => c.$id === selectedCtypeId);
    if (!selectedCtypeId || !selectedCtype || !quote || !terms || !user?.didUri) return;

    const success = await createAttesterCtype({
      ctypeId: selectedCtypeId,
      ctypeName: selectedCtype.title,
      quote,
      terms,
      attesterDidUri: user?.didUri
    });
    if (success) navigate(-1);
  };

  return (
    <div className='wrapper'>
      <div className='center'>
        <div className='column'>
          <span className='title'>Create quote for CType</span>
          <select onChange={handleCtypeChanged}>
            {ctypes.map(c =>
              <option key={c.$id} value={c.$id}>{c.title}</option>)}
          </select>
          <input
            type="number"
            onChange={handleQuoteChanged}
            placeholder='Quote (KILT)' />
          <textarea
            placeholder='Terms and Conditions'
            onChange={handleTermsChanged}
            cols={40}
            rows={5}/>
          <button className='primary' onClick={onSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default AttesterCtypeCreate;
