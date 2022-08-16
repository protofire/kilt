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
      <Topbar></Topbar>
      <div className='wrapper'>
        <div className='center'>
          <div className='column'>
            <span className='title'>Ctype for Attestation</span>
            <span className='subtitle'>Name</span>
            <span className='text'>{attesterCtype?.ctypeName}</span>
            <span className='subtitle'>Quote</span>
            <span className='text'>{attesterCtype?.quote}</span>
            <span className='subtitle'>Terms</span>
            <span className='text'>{attesterCtype?.terms}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AttesterCtypeView;
