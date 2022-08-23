import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSporran from '../../hooks/sporran';
import useUser from '../../hooks/user';

function Connect() {
  const navigate = useNavigate();
  const { sporran } = useSporran();
  const { login, user, loading } = useUser();

  useEffect(() => {
    if (!user) return;

    if (user.isAttester) navigate('/select-profile');
    else navigate('/claimer');
  }, [user]);

  const connectAccount = useCallback(async () => {
    await login(sporran);
  }, [sporran]);

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
