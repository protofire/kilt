import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onListRequests } from '../../../api/attester/requests';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';

function AttesterRequests() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    onListRequests()
      .then(setRows)
      .then(() => setLoading(false));
  }, []);

  const columns = [
    { name: 'Address' },
    { name: 'CType' },
    { name: 'Status' }
  ];

  const onClick = (id: string | number) => navigate(`${id}`);

  return (
    <div className='wrapper'>
      <Topbar />
      <div className='center'>
        <span className='title'>Claimer requests</span>
        {loading
          ? <div> Loading... </div>
          : <Table {...{ columns, rows, onClick }}></Table>}
      </div>
    </div>
  );
}

export default AttesterRequests;
