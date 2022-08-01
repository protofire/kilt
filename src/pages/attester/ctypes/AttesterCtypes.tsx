import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useAttester from '../../../hooks/attester';

function AttesterCtypes() {
  const navigate = useNavigate();
  const { onListCtypes, onDeleteCtype, loading, ctypes } = useAttester();

  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    onListCtypes().then(setRows);
  }, [ ctypes ]);

  const columns = [
    { name: 'Name' },
    { name: 'Quote' },
    { name: 'Actions' }
  ];

  const onAdd = () => navigate('create');

  return (
    <div className='wrapper'>
      <Topbar />
      {loading
        ? <div>Loading...</div>
        : <div className='center'>
          <span className='title'>CTypes & Quotes</span>
          <Table {...{ columns, rows, onDelete: onDeleteCtype }} disabled></Table>
          <button className='primary' onClick={onAdd}>Add</button>
        </div>
      }
    </div>
  );
}

export default AttesterCtypes;
