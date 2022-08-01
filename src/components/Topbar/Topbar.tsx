import useUser from '../../hooks/user';
import { formatDid } from '../../utils/string';

function Topbar() {
  const { user } = useUser();
  
  return (
    <div className='topbar'>
      <div className='topbar-content'>
        { user && 
          (user.isAttester ? 'Attester: ' : 'Claimer: ') + 
          formatDid(user ? user.did : '')}
      </div>
    </div>
  );
}

export default Topbar;
