import { useNavigate } from 'react-router-dom';
import EmojiButton from '../../components/EmojiButton/EmojiButton';
import useUser from '../../hooks/user';
import { formatDidUri } from '../../utils/formatDidUri';

function SelectProfile() {
  const navigate = useNavigate();
  const { user } = useUser();

  const toClaimer = () => navigate('/claimer');
  const toAttester = () => navigate('/attester');

  return (
    <div className='wrapper'>
      <div className='center'>
        <div className='title' >
          <span>
            Hi {user && formatDidUri(user.didUri)}<br />
            Select your profile
          </span>
        </div>
        <EmojiButton onClick={toAttester} emoji={'👍'} text={'Attester'}/>
        <EmojiButton onClick={toClaimer} emoji={'👋'} text={'Claimer'}/>
      </div>
    </div>
  );
}

export default SelectProfile;
