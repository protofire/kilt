import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/user';

function Connect() {
  const { user, login } = useUser()
  const navigate = useNavigate();
  
  const connect = async () => {
    await login();
    navigate('/select-profile');
  }

  return (
    <div>
      <div>
        user: {user}
      </div>
      <button onClick={connect}>
        Connect
      </button>
    </div>
  );
}

export default Connect;
