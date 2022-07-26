import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ClaimDetail() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className='wrapper'>
      Claim Detail {params.id}
    </div>
  );
}

export default ClaimDetail;