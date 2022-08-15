import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/user';
import { getDisplayName } from '../../utils/formatDidUri';
import { ReactComponent as BackSvg } from '../../assets/back.svg';

function Topbar() {
  const navigate = useNavigate();
  const { user } = useUser();

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
          getDisplayName(user)}
      </div>
    </div>
  );
}

export default Topbar;
