import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/user';

function Connect() {
  const { user, login } = useUser()
  const navigate = useNavigate();
  
  const connect = async () => {
    //await login();
    navigate('/select-profile');
  }

  return (
    <div className='wrapper'>
      <div className='center'>
        <button className='connect-btn' onClick={connect}>
          Connect
        </button>
      </div>
    </div>
  );
}

export default Connect;
