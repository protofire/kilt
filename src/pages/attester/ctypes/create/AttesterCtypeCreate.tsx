import { ICTypeSchema } from '@kiltprotocol/sdk-js';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAttesterCtype } from '../../../../api/attester/createAttesterCtype';
import { onListCtypes } from '../../../../api/attester/listCtypes';
import Topbar from '../../../../components/Topbar/Topbar';

function AttesterCtypeCreate() {
  const navigate = useNavigate();

  const [ctypes, setCtypes] = useState<ICTypeSchema[]>([]);
  const [selectedCtypeId, setSelectedCtypeId] = useState<string | null>(null);
  const [quote, setQuote] = useState<number>();
  const [terms, setTerms] = useState<string>();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    onListCtypes()
      .then((all) => {
        setCtypes(all.map(c => c.schema));
        if (all.length > 0) {
          setSelectedCtypeId(all[0].schema.$id);
        }
      });
  }, []);

  const handleCtypeChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCtypeId(e.target.value);
  };

  const handleQuoteChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setQuote(Number(e.target.value));
  };

  const handleTermsChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTerms(e.target.value);
  };

  const validateQuote = (quote: number) => {
    return (quote >= 0 && quote < 290_000_000);
  };

  const onSubmit = async () => {
    const selectedCtype = ctypes.find(c => c.$id === selectedCtypeId);
    if (!selectedCtypeId || !selectedCtype || !terms) return;
    if (!quote || !validateQuote(quote)) {
      setError('Invalid quote, it must be a number between 0 and 290 millions (max KILT issuance)');
      return;
    }
    setError('');

    const success = await createAttesterCtype({
      ctypeId: selectedCtypeId,
      ctypeName: selectedCtype.title,
      quote,
      terms
    });
    if (success) navigate(-1);
  };

  return (
    <div className='wrapper'>
      <Topbar />
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
            maxLength={3000}
            cols={40}
            rows={5}/>
          <div style={{ textAlign: 'end', margin: '10px' }}>
            {terms?.length ?? 0}/3000
          </div>
          {error && <div className='error'>{error}</div>}
          <button className='primary' onClick={onSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default AttesterCtypeCreate;
