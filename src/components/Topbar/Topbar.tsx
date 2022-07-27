import useUser from '../../hooks/user';
import './Topbar.css';

function Topbar() {
  const { user, isAttester } = useUser();
  
  return (
    <div className='topbar'>
      <div className='content'>
        {isAttester ? 'Attester: ' : 'Claimer: ' + user}
      </div>
    </div>
  );
}

export default Topbar;
