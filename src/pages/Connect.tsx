import React from 'react';
import { useNavigate } from 'react-router-dom';

function Connect() {

  const navigate = useNavigate();
  const connect = () => navigate('/select-profile');
  
  return (
    <div>
      <button onClick={connect}>
        Connect
      </button>
    </div>
  );
}

export default Connect;
