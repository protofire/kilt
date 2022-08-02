import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table, { Row } from '../../components/Table/Table';
import Topbar from '../../components/Topbar/Topbar';
import useClaimer from '../../hooks/claimer';
import { credentialToRow, ICredential } from '../../interfaces/credential';

function Claimer() {
  const navigate = useNavigate();
  const { onListCredentials, loading } = useClaimer();
  const [ rows, setRows ] = useState<Row[]>([]);

  useEffect(() => {
    onListCredentials().then((credentials: ICredential[]) =>
      setRows([...credentials.map(credentialToRow)]));
  }, []);

  const columns = [
    { name: 'CType' },
    { name: 'Attester' },
    { name: 'Status' }
  ];

  const onClick = (id: number | string) => navigate(`detail/${id}`);
  const onAdd = () => navigate('attester-list');

  return (
    <div className='wrapper'>
      <Topbar />
      {loading
        ? <div> Loading... </div>
        : <div className='center'>
          <span className='title'>Credentials</span>
          <Table { ...{ columns, rows, onClick } }></Table>
          <button className='primary' onClick={onAdd}>Add</button>
        </div>}
    </div>
  );
}

export default Claimer;
