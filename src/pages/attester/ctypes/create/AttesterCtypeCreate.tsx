import { useNavigate } from 'react-router-dom';

function AttesterCtypeCreate() {
  const navigate = useNavigate();
  const onSubmit = () => navigate(-1);

  return (
    <div className='wrapper'>
      <div className='center'>
        <div className='column'>
          <span className='title'>Create quote for CType</span>
          <select name="ctype" id="ctypes" placeholder='Select CType'>
            <option value="ctype1">CType 1</option>
            <option value="ctype2">CType 2</option>
            <option value="ctype3">CType 3</option>
            <option value="ctype4">CType 4</option>
          </select>
          <input type="number" placeholder='Price (KILT)' />
          <textarea placeholder='Terms and Conditions' cols={40} rows={5}/>
          <button className='primary' onClick={onSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default AttesterCtypeCreate;
