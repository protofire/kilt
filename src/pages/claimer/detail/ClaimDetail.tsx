import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onLoadCredential } from '../../../api/claimer/loadCredential';
import Topbar from '../../../components/Topbar/Topbar';
import { Status } from '../../../constants/status';
import { IAttestedCredential } from '../../../interfaces/credential';
import { getColorByStatus, getLabelByStatus } from '../../../utils/status';

function ClaimDetail() {
  const params = useParams();
  const [credential, setCredential] = useState<IAttestedCredential | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    onLoadCredential(params.id)
      .then(setCredential)
      .then(() => setLoading(false));
  }, [params]);

  const displayName = (credential: IAttestedCredential | null) => {
    if (!credential) return '';
    if (!credential.attesterWeb3name && !credential.attesterDid) return ' - ';
    return credential.attesterWeb3name ?? credential.attesterDid;
  };

  return (
    <div className='wrapper'>
      <Topbar />
      {loading
        ? <div> Loading ... </div>
        : <div className='column page'>
          <span className='title'>Claim</span>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className='text-start'>
              <div className='subtitle'>
                Attester: <strong>{displayName(credential)}</strong>
              </div>
              <div className='subtitle'>
                Status:
                <strong style={{ color: credential?.status && getColorByStatus(credential?.status) }}>
                  {credential?.status
                    ? getLabelByStatus(credential?.status)
                    : ' - '}
                </strong>
              </div>
              <div className='subtitle'>
                Ctype: <strong>{credential?.ctypeName}</strong>
              </div>
              {credential?.quote && <div className='subtitle'>
                Quote: <strong>{credential?.quote + ' KILT'}</strong>
              </div>}
            </div>
            {(credential?.status === Status.pendingPayment) && <div>
              <button className='primary'>Pay</button>
            </div>}
          </div>
          <div>
            <hr />
          </div>
          <div className='subtitle'>Terms and Conditions</div>
          <div className='text wrap'>{credential?.terms ?? ' - '}</div>
        </div>}
    </div>
  );
}

export default ClaimDetail;
