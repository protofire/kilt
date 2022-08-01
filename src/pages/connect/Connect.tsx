import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/user';

function Connect() {
  const navigate = useNavigate();
  const [did, setDid] = useState<string>('');
  
  const { login } = useUser();
  const { user } = useUser();
  
  const connect = async () => {
    await login(did);
    if(!user) return;
    if (user.isAttester) navigate('/select-profile');
    else navigate('/claimer');
  }

  return (
    <div className='wrapper'>
      <div className='center column'>
        <input type="text" value={did} placeholder={'did'} onChange={(e) => setDid(e.target.value)} />
        <button className='connect-btn' onClick={connect}>
          Connect
        </button>
      </div>
    </div>
  );
}

export default Connect;
