import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onLoadRequest } from '../../../../api/attester/requests';
import Topbar from '../../../../components/Topbar/Topbar';
import { IRequest } from '../../../../interfaces/request';

function AttesterRequestDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState<IRequest | null>(null);

  useEffect(() => {
    setLoading(true);
    onLoadRequest(Number(params.id))
      .then(setRequest)
      .then(() => setLoading(false));
  }, []);

  const goBack = () => navigate(-1);

  return (
    <div className='wrapper'>
    <Topbar />
    {loading
      ? <div> Loading ... </div>
      : <div className='column page'>
        <span className='title'>Claim</span>
        <span className='subtitle'>
          Claimer: <strong>{request?.address}</strong><em> </em>
          Status: <strong>{request?.status}</strong>
        </span>
        <span className='subtitle'>Terms and Conditions</span>
        <span className='text'>{request?.terms}</span>
        <div>
            <button className='secondary' onClick={goBack}>Reject</button>
            <button className='primary' onClick={goBack}>Verify</button>
        </div>
      </div>}
  </div>
  );
}

export default AttesterRequestDetail;
