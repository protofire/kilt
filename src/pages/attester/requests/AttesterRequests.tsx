import React from 'react';
import Table from '../../../components/Table';
import './AttesterRequests.css'

function AttesterRequests() {

  const columns = [
    {name: 'Address'},
    {name: 'CType'},
    {name: 'Status'},
  ];

  const rows = [
    {id:1, values: ['0xCase2SD..ASD','CType 1', 'Unverified']},
    {id:2, values: ['0xCase2SD..ASD','CType 1', 'Unverified']},
    {id:3, values: ['0xCase2SD..ASD','CType 1', 'Unverified']},
  ];

  const onClick = (id: number) => {}
  
  return (
    <div className='wrapper'>
      <div className='center'>
        <Table {...{columns, rows, onClick}}></Table>
      </div>
    </div>
  );
}

export default AttesterRequests;