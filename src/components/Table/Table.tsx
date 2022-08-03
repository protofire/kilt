import { Fragment } from 'react';

interface Column {
  name: string,
}

interface Cell {
  value: string,
  color?: string,
}

export interface Row {
  id: string | number,
  values: Cell[],
}

interface Props {
  columns: Column[],
  rows: Row[],
  onClick?: (id: string | number) => void,
  onDelete?: (id: string | number) => void,
  disabled?: boolean,
}

function Table({ columns, rows, onClick, onDelete, disabled = false } : Props) {
  return (
    <table>
      <thead>
        <tr>
        {columns.map(c =>
          <th key={c.name}>{c.name}</th>
        )}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) =>
          <Fragment key={i}>
            <div style={{ width: (columns.length * 100) + '%' }}>
              <hr />
            </div>
            <tr className={disabled ? '' : 'clickable'}
              onClick={() => !disabled && onClick && onClick(r.id)}>
                {r.values.map((val, i) =>
                  <td
                    key={i}
                    style={val.color ? { color: val.color } : {}}>
                      {val.value}
                  </td>
                )}
                {onDelete &&
                  <td key={r.id}>
                    <button onClick={() => onDelete(r.id)} className='action'>
                      Delete
                    </button>
                  </td>}
            </tr>
          </Fragment>
        )}
      </tbody>
    </table>
  );
}

export default Table;
