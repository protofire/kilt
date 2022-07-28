import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useClaimer from '../../../hooks/claimer';

function ClaimerAttesterList() {
  const navigate = useNavigate();
  const { onListAttesters, loading } = useClaimer();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    onListAttesters().then((rows: Row[]) => setRows(rows));
  }, [ onListAttesters ]);

  const columns = [
    {name: 'Name'},
    {name: 'CType'},
    {name: 'Quote'},
  ];

  const onClick = (id: number) => navigate(`claim/${id}`);

  return (
    <div className='wrapper'>
      <Topbar />
      {loading ? <div> Loading... </div> :
        <div className='center'>
          <span className='title'> Attesters </span>
          <Table { ...{ columns, rows, onClick } }></Table>
        </div>}
    </div>
  );
}

export default ClaimerAttesterList;