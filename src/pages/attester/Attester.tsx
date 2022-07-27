import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmojiButton from '../../components/EmojiButton/EmojiButton';
import Topbar from '../../components/Topbar/Topbar';
import './Attester.css'

function Attester() {
  const navigate = useNavigate();
  const toCTypes = () => navigate('/attester/ctypes');
  const toRequests = () => navigate('/attester/requests');
  
  return (
    <div className='wrapper'>
      <Topbar />
      <div className='center'>
        <EmojiButton emoji='👌' text='CTypes & quotes' onClick={toCTypes}/>
        <EmojiButton emoji='👏' text='Requests' onClick={toRequests}/>
      </div>
    </div>
  );
}

export default Attester;