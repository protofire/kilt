import React from 'react';
import './Table.css';

interface Column {
  name: string,
}

interface Row {
  id: number,
  values: string[],
}

interface Props {
  columns: Column[],
  rows: Row[],
  onClick: (id: number) => void,
}

function Table({ columns, rows, onClick } : Props) {
  return (
    <table>
    <tr>
      {columns.map(c => 
        <th>{c.name}</th> 
      )}
    </tr>
    {rows.map(r => 
      <tr className='clickable' onClick={() => onClick(r.id)}>
        {r.values.map(val => 
          <td>{val}</td>
        )}
      </tr> 
    )}
  </table>
  );
}

export default Table;
