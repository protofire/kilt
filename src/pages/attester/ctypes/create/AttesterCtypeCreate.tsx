import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAttester from '../../../../hooks/attester';
import useUser from '../../../../hooks/user';
import { IAttesterCtype } from '../../../../interfaces/attester-ctype';

function AttesterCtypeCreate() {
  const { user } = useUser();
  const { createCtype } = useAttester();
  const navigate = useNavigate();

  const [ctypeName, setCtypeName] = useState<string>();
  const [quote, setQuote] = useState<number>();
  const [terms, setTerms] = useState<string>();

  const onSubmit = async () => {
    const attesterDid = user?.did;
    if (!ctypeName || !quote || !terms || !attesterDid) return;

    const ctype: IAttesterCtype = {
      ctypeName,
      quote,
      terms,
      attesterDid
    };
    const success = await createCtype(ctype);
    if (success) navigate(-1);
  };

  return (
    <div className='wrapper'>
      <div className='center'>
        <div className='column'>
          <span className='title'>Create quote for CType</span>
          <input type="text" onChange={e => setCtypeName(e.target.value)} placeholder='CType name' />
          <input type="number" onChange={e => setQuote(Number(e.target.value))} placeholder='Quote (KILT)' />
          <textarea placeholder='Terms and Conditions' onChange={e => setTerms(e.target.value)} cols={40} rows={5}/>
          <button className='primary' onClick={onSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default AttesterCtypeCreate;
