import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/Table';
import './AttesterCtypes.css'

function AttesterCtypes() {
  const navigate = useNavigate();

  const columns = [
    {name: 'Name'},
    {name: 'Quote'},
    {name: 'Actions'},
  ];

  const rows = [
    {id: 1, values: ['CType 1', '30 KILT', <button>delete</button>]},
    {id: 2, values: ['CType 2', '10 KILT', <button>delete</button>]},
    {id: 3, values: ['CType 3', '12 kilt', <button>delete</button>]},
  ];

  const onClick = (id: number) => {}

  const onAdd = () => navigate('create')
  
  return (
    <div className='wrapper'>
      <div className='center'>
      <Table {...{columns, rows, onClick}}></Table>
      <button className='' onClick={onAdd}>Add</button>
      </div>
    </div>
  );
}

export default AttesterCtypes;