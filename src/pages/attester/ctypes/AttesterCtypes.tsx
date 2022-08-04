import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useAttester from '../../../hooks/attester';
import useUser from '../../../hooks/user';
import { attesterCtypeToRow } from '../../../interfaces/attester-ctype';

function AttesterCtypes() {
  const navigate = useNavigate();
  const { onListCtypes, onDeleteCtype, loading } = useAttester();
  const [rows, setRows] = useState<Row[]>([]);
  const { user, loadUser } = useUser();

  useEffect(() => {
    loadTable();
  }, []);

  const loadTable = () => {
    const currentUser = user ?? loadUser();
    if (!currentUser) return;
    onListCtypes(currentUser.did)
      .then((ctypes) => ctypes.map((c) => attesterCtypeToRow(c)))
      .then(setRows);
  };

  const columns = [
    { name: 'Name' },
    { name: 'Quote' },
    { name: 'Actions' }
  ];

  const onAdd = () => navigate('create');

  const onDelete = async (id: string) => user &&
    await onDeleteCtype(user.did, id).then(loadTable);

  return (
    <div className='wrapper'>
      <Topbar />
      {loading
        ? <div>Loading...</div>
        : <div className='center'>
          <span className='title'>CTypes & Quotes</span>
          <Table {...{ columns, rows, onDelete }} disabled></Table>
          <button className='primary' onClick={onAdd}>Add</button>
        </div>
      }
    </div>
  );
}

export default AttesterCtypes;
