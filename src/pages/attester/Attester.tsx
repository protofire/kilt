import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Attester.css'

function Attester() {
  const navigate = useNavigate();
  
  const toCTypes = () => navigate('/attester/ctypes');
  const toRequests = () => navigate('/attester/requests');
  
  return (
    <div className='wrapper'>
      <div className='center'>
        <button className='profile-btn' onClick={toCTypes}>
          CTypes & quotes
        </button>
        <button className='profile-btn margin-left' onClick={toRequests}>
          Requests
        </button>
      </div>
    </div>
  );
}

export default Attester;