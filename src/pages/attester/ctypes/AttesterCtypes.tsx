import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useAttesterCtypes from '../../../hooks/attester-ctypes';
import './AttesterCtypes.css'

interface IRow {
  id: number;
  values: (string | JSX.Element)[];
}

function AttesterCtypes() {
  const navigate = useNavigate();
  const { onLoad, onDelete, loading } = useAttesterCtypes();

  const [rows, setRows] = useState<IRow[]>([]);

  useEffect(() => {
    onLoad().then((rows: IRow[]) => {
      const rowsWithActions = rows.map(r => 
        ({...r, values: [...r.values, 
          <button onClick={() => onDelete(r.id)} 
            className='action'>Delete</button>]}));
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
        'Loading...' : 
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