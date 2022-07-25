import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectProfile() {
  const navigate = useNavigate();
  
  const toClaimer = () => navigate('/claimer');
  const toAttester = () => navigate('/attester');
  
  return (
    <div>
      <button onClick={toAttester}>
        Attester
      </button>
      <button onClick={toClaimer}>
        Claimer
      </button>
    </div>
  );
}

export default SelectProfile;