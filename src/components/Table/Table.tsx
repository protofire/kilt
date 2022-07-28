import { Fragment } from 'react';

interface Column {
  name: string,
}

interface Cell {
  value: string | JSX.Element,
  color?: string,
}

export interface Row {
  id: number,
  values: Cell[],
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
        <div style={{width: (rows.length * 100)+'%'}}>
          <hr />
        </div>
        <tr className={disabled ? '' : 'clickable'} 
          onClick={() => !disabled && onClick(r.id)}>
            {r.values.map(val => 
              <td style={val.color ? {color: val.color}:{}}>{val.value}</td>
            )}
        </tr> 
      </Fragment>
    )}
    </table>
  );
}

export default Table;
