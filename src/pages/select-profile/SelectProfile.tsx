import { useNavigate } from 'react-router-dom';
import EmojiButton from '../../components/EmojiButton/EmojiButton';
import Topbar from '../../components/Topbar/Topbar';
import useUser from '../../hooks/user';
import { getDisplayName } from '../../utils/did';

function SelectProfile() {
  const navigate = useNavigate();
  const { user } = useUser();

  const toClaimer = () => navigate('/claimer');
  const toAttester = () => navigate('/attester');

  return (
    <div className='wrapper'>
      <Topbar />
      <div className='center'>
        <div className='title' >
          <span>
            Hi <strong>{user && getDisplayName(user)}</strong><br />
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
