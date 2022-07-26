import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AttesterRequestDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1)
  
  return (
    <div className='wrapper'>
        <div className='column'>
          <span>Requests</span>
          <span>Claimer: 0xasd2...asd2 (CType {params.id})</span>
          <span>Status: Unverified</span>
          <span>Terms and Conditions</span>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea 
            commodo consequat.
          </span>
          <label>Something about you
            <textarea name="introduction" placeholder='Introduce yourself'></textarea>
          </label>
          <span>Attached Files</span>
          <div>
            <button onClick={goBack}>Reject</button>
            <button onClick={goBack}>Verify</button>
          </div>
        </div>
    </div>
  );
}

export default AttesterRequestDetail;