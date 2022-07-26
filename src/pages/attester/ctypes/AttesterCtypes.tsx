import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import './AttesterCtypes.css'

function Actions() {
  return (
    <>
    <button className='action'>Edit</button>
    <button className='action'>Delete</button>
    </>
  );
}

function AttesterCtypes() {
  const navigate = useNavigate();

  const columns = [
    {name: 'Name'},
    {name: 'Quote'},
    {name: 'Actions'},
  ];

  const rows = [
    {id: 1, values: ['CType 1', '30 KILT', <Actions />]},
    {id: 2, values: ['CType 2', '10 KILT', <Actions />]},
    {id: 3, values: ['CType 3', '12 kilt', <Actions />]},
  ];

  const onClick = (id: number) => {}

  const onAdd = () => navigate('create')
  
  return (
    <div className='wrapper'>
      <Topbar />
      <div className='center'>
      <Table {...{columns, rows, onClick}}></Table>
      <button className='primary' onClick={onAdd}>Add</button>
      </div>
    </div>
  );
}

export default AttesterCtypes;