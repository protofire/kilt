import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';

function Claimer() {
  const navigate = useNavigate();

  const columns = [
    {name: 'CType'},
    {name: 'Attester'},
    {name: 'Status'},
  ];

  const rows = [
    {id: 1, values: ['CType 1', 'Attester 1','Unverified']},
    {id: 2, values: ['CType 2', 'Attester 2','Unverified']},
    {id: 3, values: ['CType 3', 'Attester 3','Unverified']},
  ];

  const onClick = (id: number) => navigate(`detail/${id}`);

  const onAdd = () => navigate('attester-list');

  return (
    <div className='wrapper'>
      <div className='center'>
        <Table {...{columns, rows, onClick}}></Table>
        <button onClick={onAdd}>Add</button>
      </div>
    </div>
  );
}

export default Claimer;