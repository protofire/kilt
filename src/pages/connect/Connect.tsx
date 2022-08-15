import { DidUri } from '@kiltprotocol/sdk-js';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/user';
import { isValidDid } from '../../utils/did';

function Connect() {
  const navigate = useNavigate();
  const { login, logout, user } = useUser();

  const [didUri, setDidUri] = useState<string>();

  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!user) return;
    setDidUri(user.didUri);
  }, [ user ]);

  const connect = async () => {
    if (!isValidDid(didUri)) return setError('Invalid Did');
    const currentUser = user ?? await login(didUri as DidUri);
    if (!currentUser) return setError('Could not login with the given Did');
    if (currentUser.isAttester) navigate('/select-profile');
    else navigate('/claimer');
  };

  const handleDidUriChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setDidUri(e.target.value);
  };

  return (
    <div className='wrapper'>
      <div className='center column'>
        <input type="text" value={didUri} placeholder={'DiD Uri'} onChange={handleDidUriChange} />
        {error && <div className='error'>{error}</div>}
        <button className='primary' onClick={connect}>
          Connect
        </button>
        <button className='secondary' onClick={logout}>
          Disconnect
        </button>
      </div>
    </div>
  );
}

export default Connect;
