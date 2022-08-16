import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmPaymentCredential } from '../../../../api/attester/confirmPaymentCredential';
import { onLoadRequest } from '../../../../api/attester/requests';
import { verifyAttesterRequest } from '../../../../api/attester/verifyAttesterRequest';
import Topbar from '../../../../components/Topbar/Topbar';
import { Status } from '../../../../constants/status';
import useUser from '../../../../hooks/user';
import { IAttesterRequestDetail } from '../../../../interfaces/attesterRequest';
import { formatDidUri } from '../../../../utils/did';
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
  }, [ user, params ]);

  const goBack = () => navigate(-1);

  const verify = useCallback(async () => {
    if (!user || !params.id) return;
    const confirmed = confirm('Are you sure you want to verify?');
    if (confirmed) {
      setLoading(true);
      await verifyAttesterRequest(params.id, user.didUri);
      setLoading(false);
      goBack();
    }
  }, [ user, params ]);

  const confirmPayment = useCallback(async () => {
    if (!user || !params.id) return;
    const confirmed = confirm('Are you sure you want to confirm?');
    if (confirmed) {
      setLoading(true);
      await confirmPaymentCredential(params.id, user.didUri);
      setLoading(false);
      goBack();
    }
  }, [ params, user ]);

  const getActionByStatus = useCallback(() => {
    if (!request) return;
    switch (request.status) {
      case Status.unverified: return 'Verify';
      case Status.pendingPayment: return 'Confirm Payment';
      default: return '';
    }
  }, [request, Status]);

  const runCallbackByStatus = useCallback(() => {
    if (!request) return;
    switch (request.status) {
      case Status.unverified: return verify();
      case Status.pendingPayment: return confirmPayment();
      default: return () => {};
    }
  }, [request, Status]);

  const displayName = (req: IAttesterRequestDetail) => {
    return req.claimerWeb3name ?? formatDidUri(req.claimerDid);
  };

  const reject = () => {
    const confirmed = confirm('Are you sure you want to reject?');
    if (confirmed) {
      goBack();
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
              {request && displayName(request)}
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
        <span className='text wrap'>{request?.terms}</span>
        <hr />
        <span className='subtitle'>Claimer Information</span>
        <span className='text'>
          {request && Object.keys(request.form).map(f =>
            <div key={f}>{f + ': ' + request.form[f]}</div>)}
        </span>
        <div>
          {request?.status === Status.unverified &&
            <button className='secondary' onClick={reject}>
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
