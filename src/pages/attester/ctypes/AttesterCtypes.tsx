import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onDeleteAttesterCtype } from '../../../api/attester/deleteAttesterCtype';
import { onListAttesterCtypes } from '../../../api/attester/listAttesterCtypes';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useUser from '../../../hooks/user';
import { IAttesterCtype } from '../../../interfaces/attesterCtype';

function AttesterCtypes() {
  const navigate = useNavigate();
  const { user, loadUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    loadTable();
  }, []);

  const attesterCtypeToRow = (attesterCtype: IAttesterCtype) => ({
    id: attesterCtype.ctypeId,
    values: [
      { value: attesterCtype.ctypeName },
      { value: attesterCtype.quote + ' KILT' }
    ]
  }) as Row;

  const loadTable = async () => {
    setLoading(true);
    const currentUser = user ?? loadUser();
    if (!currentUser) return;
    const ctypes = await onListAttesterCtypes(currentUser.didUri);
    const ctypesRows = ctypes.map((c) => attesterCtypeToRow(c));
    setRows(ctypesRows);
    setLoading(false);
  };

  const onDelete = async (id: string) => {
    if (!user) return;
    setLoading(true);
    await onDeleteAttesterCtype(user.didUri, id);
    loadTable();
    setLoading(false);
  };

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
            disabled />
          <button className='primary' onClick={onAdd}>Add</button>
        </div>
      }
    </div>
  );
}

export default AttesterCtypes;
