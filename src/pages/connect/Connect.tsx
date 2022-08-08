import { DidUri } from '@kiltprotocol/sdk-js';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/user';

function Connect() {
  const navigate = useNavigate();
  const { login, logout, user } = useUser();

  const [didUri, setDidUri] = useState<DidUri>();

  useEffect(() => {
    if (!user) return;
    setDidUri(user.didUri);
  }, [ user ]);

  const connect = async () => {
    if (!didUri) return;
    const currentUser = user ?? await login(didUri);
    if (!currentUser) throw Error('Could not login user');

    if (currentUser.isAttester) navigate('/select-profile');
    else navigate('/claimer');
  };

  const handleDidUriChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDidUri(e.target.value as DidUri);
  };

  return (
    <div className='wrapper'>
      <div className='center column'>
        <input type="text" value={didUri} placeholder={'DiD Uri'} onChange={handleDidUriChange} />
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
