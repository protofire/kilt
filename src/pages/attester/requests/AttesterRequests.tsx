import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useAttester from '../../../hooks/attester';
import './AttesterRequests.css'

function AttesterRequests() {
  const navigate = useNavigate();
  const { onLoadRequests, loading } = useAttester();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    onLoadRequests().then((rows: Row[]) => setRows(rows));
  }, []);

  const columns = [
    {name: 'Address'},
    {name: 'CType'},
    {name: 'Status'},
  ];

  const onClick = (id: number) => navigate(`${id}`);
  
  return (
    <div className='wrapper'>
      <Topbar />
      <div className='center'>
        <span className='title'>Claimer requests</span>
        {loading ? 
          <div> Loading... </div> : 
          <Table {...{columns, rows, onClick}}></Table>}
      </div>
    </div>
  );
}

export default AttesterRequests;