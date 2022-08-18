import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSporran from '../../hooks/sporran';
import useUser from '../../hooks/user';

function Connect() {
  const navigate = useNavigate();
  const { connect, session, connecting, sporran } = useSporran();
  const { login, user, loading } = useUser();

  useEffect(() => {
    connect();
  }, [ sporran ]);

  useEffect(() => {
    if (!user) return;

    if (user.isAttester) navigate('/select-profile');
    else navigate('/claimer');
  }, [ user ]);

  const connectAccount = useCallback(async () => {
    if (!session) return;
    await login(session);
  }, [ session ]);

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
        {connecting && <div> Connecting... </div>}
        <button disabled={connecting} className='primary' onClick={connectAccount}>
          Connect
        </button>
      </div>
    </div>
  );
}

export default Connect;
