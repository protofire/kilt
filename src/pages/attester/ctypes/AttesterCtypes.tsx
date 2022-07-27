import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useAttester from '../../../hooks/attester';
import './AttesterCtypes.css'

function AttesterCtypes() {
  const navigate = useNavigate();
  const { onLoadCtypes, onDeleteCtype, loading } = useAttester();

  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    onLoadCtypes().then((rows: Row[]) => {
      const rowsWithActions = rows.map(r => 
        ({...r, values: [...r.values,
          {value: <button onClick={() => onDeleteCtype(r.id)} 
            className='action'>Delete</button>}]}));
      setRows(rowsWithActions);
    });
  }, []);

  const columns = [
    {name: 'Name'},
    {name: 'Quote'},
    {name: 'Actions'},
  ];

  // creates new quote
  const onAdd = () => navigate('create')
  
  return (
    <div className='wrapper'>
      <Topbar />
      {loading ? 
        <div>Loading...</div>  : 
        <div className='center'>
          <span className='title'>CTypes & Quotes</span>
          <Table {...{columns, rows }} disabled></Table>
          <button className='primary' onClick={onAdd}>Add</button>
        </div>
      }
    </div>
  );
}

export default AttesterCtypes;