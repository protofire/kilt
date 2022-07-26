import React from 'react';
import { useNavigate } from 'react-router-dom';

function AttesterCtypeCreate() {

  const navigate = useNavigate();

  const onSubmit = () => navigate(-1)
  
  return (
    <div className='wrapper'>
      <div className='center'>
        <div className='column'>
          <select name="ctype" id="ctypes" placeholder='Select CType'>
            <option value="ctype1">CType 1</option>
            <option value="ctype2">CType 2</option>
            <option value="ctype3">CType 3</option>
            <option value="ctype4">CType 4</option>
          </select>
          <input type="text" placeholder='Price (KILT)' />
          <input type="textarea" placeholder='Terms and Conditions' />
          <button className='' onClick={onSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default AttesterCtypeCreate;