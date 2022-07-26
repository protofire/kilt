import useUser from '../../hooks/user';
import './Topbar.css';

function Topbar() {
  const { user } = useUser();
  
  return (
    <div className='topbar'>
      <div className='content'>
        Atterster: {user}
      </div>
    </div>
  );
}

export default Topbar;
