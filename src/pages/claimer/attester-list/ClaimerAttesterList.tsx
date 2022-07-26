import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/Table';

function ClaimerAttesterList() {
  const navigate = useNavigate();

  const columns = [
    {name: 'Name'},
    {name: 'CType'},
    {name: 'Quote'},
  ];

  const rows = [
    {id: 1, values: ['Attester 1', 'CType 1', '30 KILT']},
    {id: 2, values: ['Attester 2', 'CType 2', '20 KILT']},
    {id: 3, values: ['Attester 3', 'CType 3', '25 KILT']},
  ];

  const onClick = (id: number) => navigate(`attester/${id}`);

  return (
    <div className='wrapper'>
      <div className='center'>
        <Table {...{columns, rows, onClick}}></Table>
      </div>
    </div>
  );
}

export default ClaimerAttesterList;