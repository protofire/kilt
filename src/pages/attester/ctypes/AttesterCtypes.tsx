import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onDeleteAttesterCtype } from '../../../api/attester/deleteAttesterCtype';
import { onListAttesterCtypes } from '../../../api/attester/listAttesterCtypes';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import { IAttesterCtype } from '../../../interfaces/attesterCtype';

function AttesterCtypes() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    loadTable();
  }, []);

  const attesterCtypeToRow = (attesterCtype: IAttesterCtype) => ({
    id: attesterCtype._id,
    values: [
      { value: attesterCtype.ctypeName },
      { value: attesterCtype.quote + ' KILT' }
    ]
  }) as Row;

  const loadTable = async () => {
    setLoading(true);
    const ctypes = await onListAttesterCtypes();
    const ctypesRows = ctypes.map((c) => attesterCtypeToRow(c));
    setRows(ctypesRows);
    setLoading(false);
  };

  const onDelete = useCallback(async (id: string) => {
    setLoading(true);
    await onDeleteAttesterCtype(id);
    loadTable();
    setLoading(false);
  }, []);

  const onView = useCallback((id: string) => {
    navigate(`${id}`);
  }, []);

  const onAdd = () => navigate('create');

  return (
    <div className='wrapper'>
      <Topbar />
      {loading
        ? <div>Loading...</div>
        : <div className='center'>
          <span className='title'>CTypes & Quotes</span>
          <Table
            columns={[
              { name: 'Name' },
              { name: 'Quote' },
              { name: 'Actions' }]}
            rows={rows}
            onDelete={onDelete}
            onClick={onView}
          />
          <button className='primary' onClick={onAdd}>Add Quote</button>
        </div>
      }
    </div>
  );
}

export default AttesterCtypes;
