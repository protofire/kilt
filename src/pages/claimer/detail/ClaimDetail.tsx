import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Topbar from '../../../components/Topbar/Topbar';
import useClaimer from '../../../hooks/claimer';
import { ICredential } from '../../../interfaces/credential';
import './ClaimDetail.css';

function ClaimDetail() {
  const params = useParams();
  const { onLoadCredential, loading } = useClaimer();
  const [credential, setCredential] = useState<ICredential | null>(null);

  useEffect(() => {
    onLoadCredential(Number(params.id)).then(setCredential);
  }, []);

  return (
    <div className='wrapper'>
      <Topbar />
      {loading ? <div> Loading ... </div> : 
        <div className='column page'>
          <span className='title'>Claim</span>
          <span className='subtitle'> 
            Attester: <strong>{credential?.attester}</strong><em> </em>
            Status: <strong>{credential?.status}</strong>
          </span>
          <span className='subtitle'>Terms and Conditions</span>
          <span className='text'>{credential?.terms}</span>
          <div><hr /></div>
          <label className='subtitle'>Intro Text<br />
            <div className='text'>{credential?.claimerText}</div>
          </label>
          <div>
            <div className='subtitle'>Files</div>
            <ul> {credential?.files.map(f => <li>{f}</li>)} </ul>
          </div>
        </div>}
    </div>
  );
}

export default ClaimDetail;