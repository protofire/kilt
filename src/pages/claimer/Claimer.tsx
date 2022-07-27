import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table/Table';

function Claimer() {
  const navigate = useNavigate();

  const columns = [
    {name: 'CType'},
    {name: 'Attester'},
    {name: 'Status'},
  ];

  const rows = [
    {id: 1, values: [{value:'CType 1'}, {value:'Attester 1'},{value:'Unverified'}]},
    {id: 2, values: [{value:'CType 2'}, {value:'Attester 2'},{value:'Unverified'}]},
    {id: 3, values: [{value:'CType 3'}, {value:'Attester 3'},{value:'Unverified'}]},
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