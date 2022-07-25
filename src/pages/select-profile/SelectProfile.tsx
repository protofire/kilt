import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectProfile.css'

function SelectProfile() {
  const navigate = useNavigate();
  
  const toClaimer = () => navigate('/claimer');
  const toAttester = () => navigate('/attester');
  
  return (
    <div className='wrapper'>
      <div className='center'>
        <button className='profile-btn' onClick={toAttester}>
          Attester
        </button>
        <button className='profile-btn margin-left' onClick={toClaimer}>
          Claimer
        </button>
      </div>
    </div>
  );
}

export default SelectProfile;