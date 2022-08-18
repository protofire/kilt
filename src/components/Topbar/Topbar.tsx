import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/user';
import { getDisplayName } from '../../utils/did';
import { ReactComponent as BackSvg } from '../../assets/back.svg';

function Topbar() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const goBack = () => navigate(-1);

  return (
    <div className='topbar'>
      <div className='topbar-content-left'>
        <button className='primary' onClick={goBack}>
          <BackSvg width={'12px'} height={'12px'}/> Back
        </button>
      </div>
      <div className='topbar-content-right'>
        { user &&
          (user.isAttester ? 'Attester: ' : 'Claimer: ') +
          getDisplayName(user)} <em> </em>
        <button className='secondary' onClick={logout}>
          Disconnect
        </button>
      </div>
    </div>
  );
}

export default Topbar;
