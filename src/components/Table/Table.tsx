import { useCallback } from 'react';

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
  onClick?: (...params: any) => void,
  onDelete?: (...params: any) => void,
  disabled?: boolean,
}

function Table({ columns, rows, onClick, onDelete, disabled = false } : Props) {
  const onDeletePressed = useCallback(async (id: string | number) => {
    if (!onDelete) return;
    const confirmed = confirm('Are you sure you want to delete?');
    if (confirmed) {
      onDelete(id);
    }
  }, []);

  return (
    <table>
      <thead>
        <tr>
        {columns.map(c =>
          <td key={c.name}>
            <strong>{c.name}</strong>
          </td>
        )}
        </tr>
      </thead>
      <tbody>
      {rows.map((r, i) =>
        <tr key={i} className={disabled ? '' : 'clickable'}
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
              <button
                onClick={(e) => {
                  onDeletePressed(r.id);
                  e.stopPropagation();
                }}
                className='action'>
                Delete
              </button>
            </td>}
        </tr>
      )}
      </tbody>
    </table>
  );
}

export default Table;
