import React from 'react';
import Table from '../../components/Table';

function Claimer() {

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

  const onClick = (id: number) => {};

  return (
    <div>
      <div>
        Credentials
      </div>
      <div>
        <Table {...{columns, rows, onClick}}></Table>
      </div>
    </div>
  );
}

export default Claimer;