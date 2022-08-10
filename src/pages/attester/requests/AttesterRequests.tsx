import { useNavigate } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import { useAttesterRequests } from '../../../hooks/attesterRequests';

function AttesterRequests() {
  const navigate = useNavigate();
  const { loading, rows } = useAttesterRequests();

  const onClick = (id: string | number) => navigate(`${id}`);

  return (
    <div className='wrapper'>
      <Topbar />
      <div className='center'>
        <span className='title'>Claimer requests</span>
        {loading
          ? <div> Loading... </div>
          : <Table
              columns={[
                { name: 'Address' },
                { name: 'CType' },
                { name: 'Status' }]}
              rows={rows}
              onClick={onClick} />}
      </div>
    </div>
  );
}

export default AttesterRequests;
