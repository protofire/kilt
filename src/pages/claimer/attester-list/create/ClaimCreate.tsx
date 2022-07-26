import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ClaimCreate() {
  const params = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1)

  const onFileChange = () => {};
  const onFileUpload = () => {};
  
  return (
    <div className='wrapper'>
        <div className='column'>
          <span>Create</span>
          <span>Attester: Attester {params.id})</span>
          <span>Terms and Conditions</span>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea 
            commodo consequat.
          </span>
          <label>Include all the relevant information and/or files for the attester.
            <br />
            <textarea name="introduction" placeholder='Introduce yourself'></textarea>
          </label>
          <div>
            <input type="file" onChange={onFileChange} />
          </div>
          <div>
            <button onClick={goBack}>Cancel</button>
            <button onClick={goBack}>Submit</button>
          </div>
        </div>
    </div>
  );
}

export default ClaimCreate;