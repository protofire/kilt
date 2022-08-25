import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useSporran from '../../hooks/sporran';
import useUser from '../../hooks/user';

function Connect() {
  const navigate = useNavigate();
  const { loading, login } = useSporran();
  const { loadUser } = useUser();

  const connectAccount = useCallback(async () => {
    await login();
    const user = loadUser();
    if (!user) return;
    if (user.isAttester) navigate('/select-profile');
    else navigate('/claimer');
  }, []);

  if (loading) {
    return (
      <div className='wrapper'>
        <div className='center column'>
          <div> Loading... </div>
        </div>
      </div>
    );
  }

  return (
    <div className='wrapper'>
      <div className='center column'>
        <button className='primary' onClick={connectAccount}>
          Connect
        </button>
      </div>
    </div>
  );
}

export default Connect;
