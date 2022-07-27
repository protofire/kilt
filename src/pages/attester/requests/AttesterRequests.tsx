import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useAttesterRequests from '../../../hooks/attester-requests';
import './AttesterRequests.css'

function AttesterRequests() {

  const navigate = useNavigate();

  const { onLoad, loading } = useAttesterRequests();

  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    onLoad().then((rows: Row[]) => setRows(rows));
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