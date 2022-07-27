import React, { Fragment } from 'react';
import './Table.css';

interface Column {
  name: string,
}

export interface Row {
  id: number,
  values: (string | JSX.Element)[],
}

interface Props {
  columns: Column[],
  rows: Row[],
  onClick?: (id: number) => void,
  disabled?: boolean,
}

function Table({ columns, rows, onClick = () => {}, disabled = false } : Props) {
  return (
    <table>
    <tr>
      {columns.map(c => 
        <th key={c.name}>{c.name}</th> 
      )}
    </tr>
    {rows.map(r => 
      <Fragment key={r.id}>
        <div>
          <hr/>
        </div>
        <tr className={disabled ? '' : 'clickable'} 
          onClick={() => !disabled && onClick(r.id)}>
            {r.values.map(val => 
              <td>{val}</td>
            )}
        </tr> 
      </Fragment>
    )}
    </table>
  );
}

export default Table;
