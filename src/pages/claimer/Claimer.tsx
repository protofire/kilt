import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table, { Row } from '../../components/Table/Table';
import Topbar from '../../components/Topbar/Topbar';
import useClaimer from '../../hooks/claimer';

function Claimer() {
  const navigate = useNavigate();
  const { onLoadCredentials, loading } = useClaimer();
  const [ rows, setRows ] = useState<Row[]>([]);

  useEffect(() => {
    onLoadCredentials().then((rows: Row[]) => setRows(rows));
  }, []);

  const columns = [
    {name: 'CType'},
    {name: 'Attester'},
    {name: 'Status'},
  ];

  const onClick = (id: number) => navigate(`detail/${id}`);
  const onAdd = () => navigate('attester-list');

  return (
    <div className='wrapper'>
      <Topbar />
      {loading ? 
        <div> Loading... </div> :
        <div className='center'>
          <span className='title'>Credentials</span>
          <Table { ...{ columns, rows, onClick } }></Table>
          <button className='primary' onClick={onAdd}>Add</button>
        </div>}
    </div>
  );
}

export default Claimer;