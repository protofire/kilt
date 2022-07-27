import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';

function ClaimerAttesterList() {
  const navigate = useNavigate();

  const columns = [
    {name: 'Name'},
    {name: 'CType'},
    {name: 'Quote'},
  ];

  const rows = [
    {id: 1, values: [{value:'Attester 1'}, {value:'CType 1'}, {value:'30 KILT'}]},
    {id: 2, values: [{value:'Attester 2'}, {value:'CType 2'}, {value:'20 KILT'}]},
    {id: 3, values: [{value:'Attester 3'}, {value:'CType 3'}, {value:'25 KILT'}]},
  ];

  const onClick = (id: number) => navigate(`attester/${id}`);

  return (
    <div className='wrapper'>
      <Topbar />
      <div className='center'>
        <span className='title'> Attesters </span>
        <Table { ...{ columns, rows, onClick } }></Table>
      </div>
    </div>
  );
}

export default ClaimerAttesterList;