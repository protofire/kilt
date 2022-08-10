import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onLoadRequest } from '../../../../api/attester/requests';
import { verifyAttesterRequest } from '../../../../api/attester/verifyAttesterRequest';
import Topbar from '../../../../components/Topbar/Topbar';
import { Status } from '../../../../constants/status';
import useUser from '../../../../hooks/user';
import { IAttesterRequestDetail } from '../../../../interfaces/attesterRequest';
import { formatDidUri } from '../../../../utils/formatDidUri';
import { getColorByStatus, getLabelByStatus } from '../../../../utils/requestStatus';

function AttesterRequestDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState<IAttesterRequestDetail | null>(null);

  useEffect(() => {
    setLoading(true);
    if (!user) return;
    if (!params.id) return goBack();
    onLoadRequest(params.id, user.didUri)
      .then(setRequest)
      .then(() => setLoading(false));
  }, [ user ]);

  const goBack = () => navigate(-1);

  const verify = async () => {
    if (!user || !request || !params.id) return;
    setLoading(true);
    await verifyAttesterRequest(params.id, user.didUri);
    setLoading(false);
    goBack();
  };

  const confirmPayment = async () => {
    setLoading(true);
    setLoading(false);
    goBack();
  };

  const getActionByStatus = () => {
    if (!request) return;
    switch (request.status) {
      case Status.unverified: return 'Verify';
      case Status.pendingPayment: return 'Confirm Payment';
      default: return '';
    }
  };

  const runCallbackByStatus = () => {
    if (!request) return;
    switch (request.status) {
      case Status.unverified: return verify();
      case Status.pendingPayment: return confirmPayment();
      default: return () => {};
    }
  };

  return (
    <div className='wrapper'>
    <Topbar />
    {loading
      ? <div> Loading ... </div>
      : <div className='column page'>
        <span className='title'>Claim</span>
        <span className='text'>
          <div>
            Claimer:<em> </em>
            <strong>
              {request && formatDidUri(request.claimerDidUri)}
            </strong>
          </div> <br />
          <div>
            Status:<em> </em>
            {request?.status && <strong style={{ color: getColorByStatus(request.status) }}>
              {getLabelByStatus(request.status)}
            </strong>}
          </div> <br />
          <div>
            Ctype: <strong>{request?.ctypeName}</strong>
          </div>
        </span>
        <br />
        <span className='subtitle'>Terms and Conditions</span>
        <span className='text'>{request?.terms}</span>
        <hr />
        <span className='subtitle'>Claimer Information</span>
        <span className='text'>
          {request && Object.keys(request.form).map(f =>
            <div key={f}>{f + ': ' + request.form[f]}</div>)}
        </span>
        <div>
          {request?.status === Status.unverified &&
            <button className='secondary' onClick={goBack}>
              Reject
            </button>}
          <button className='primary' onClick={() => runCallbackByStatus()}>
            {getActionByStatus()}
          </button>
        </div>
      </div>}
  </div>
  );
}

export default AttesterRequestDetail;
