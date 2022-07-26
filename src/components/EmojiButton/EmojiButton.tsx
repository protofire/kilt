import React from 'react';
import './EmojiButton.css';

interface Props {
  text: string,
  emoji: string,
  onClick: () => void,
}

function EmojiButton({ text, emoji, onClick } : Props) {
  return (
    <button className='emoji-btn' onClick={onClick}>          
      <div className='emoji'>
        {emoji}
      </div>
      {text}
    </button>
  );
}

export default EmojiButton;
