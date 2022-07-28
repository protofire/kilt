import useUser from '../../hooks/user';

function Topbar() {
  const { user, isAttester } = useUser();
  
  return (
    <div className='topbar'>
      <div className='topbar-content'>
        {isAttester ? 'Attester: ' : 'Claimer: ' + user}
      </div>
    </div>
  );
}

export default Topbar;
