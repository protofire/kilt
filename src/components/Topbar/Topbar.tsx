import useUser from '../../hooks/user';
import { formatDidUri } from '../../utils/formatDidUri';

function Topbar() {
  const { user } = useUser();

  return (
    <div className='topbar'>
      <div className='topbar-content'>
        { user &&
          (user.isAttester ? 'Attester: ' : 'Claimer: ') +
          formatDidUri(user.didUri)}
      </div>
    </div>
  );
}

export default Topbar;
