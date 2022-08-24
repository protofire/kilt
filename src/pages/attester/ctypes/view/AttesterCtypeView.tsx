import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onLoadAttesterCtype } from '../../../../api/claimer/loadAttesterCtype';
import Topbar from '../../../../components/Topbar/Topbar';
import useUser from '../../../../hooks/user';
import { IAttesterCtype } from '../../../../interfaces/attesterCtype';

function AttesterCtypeView() {
  const { user } = useUser();
  const { id } = useParams();

  const [attesterCtype, setAttesterCtype] = useState<IAttesterCtype | null>(null);

  useEffect(() => {
    if (!user || !id) return;
    onLoadAttesterCtype(id)
      .then((ac) => {
        setAttesterCtype(ac);
      });
  }, [ user, id ]);

  return (
    <>
      <Topbar/>
      <div className='wrapper'>
        <div className='center'>
          <div className='column page'>
            <div className='title'>Ctype for Attestation</div>
            <div className='subtitle'>Name</div>
            <div className='text'>{attesterCtype?.ctypeName}</div>
            <div className='subtitle'>Quote</div>
            <div className='text'>{attesterCtype?.quote}</div>
            <div className='subtitle'>Terms</div>
            <div className='text wrap'>{attesterCtype?.terms}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AttesterCtypeView;
