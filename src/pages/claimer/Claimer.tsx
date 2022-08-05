import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table, { Row } from '../../components/Table/Table';
import Topbar from '../../components/Topbar/Topbar';
import { statusToCeil } from '../../constants/claim-status';
import useClaimer from '../../hooks/claimer';
import useUser from '../../hooks/user';
import { ICredential } from '../../interfaces/credential';
import { formatDid } from '../../utils/string';

function Claimer() {
  const navigate = useNavigate();
  const { onListCredentials, loading } = useClaimer();
  const [ rows, setRows ] = useState<Row[]>([]);
  const { user, loadUser } = useUser();

  useEffect(() => {
    const currentUser = user ?? loadUser();
    if (!currentUser) return;
    onListCredentials(currentUser.did)
      .then((credentials: ICredential[]) =>
        setRows([...credentials.map(credentialToRow)]));
  }, []);

  const credentialToRow = (credential: ICredential) => ({
    id: credential.id,
    values: [
      { value: credential.label },
      { value: formatDid(credential.attesterDid) },
      statusToCeil[credential.status]
    ]
  }) as Row;

  const columns = [
    { name: 'CType' },
    { name: 'Attester' },
    { name: 'Status' }
  ];

  const onClick = (id: number | string) => navigate(`detail/${id}`);
  const onAdd = () => navigate('attester-list');

  return (
    <div className='wrapper'>
      <Topbar />
      {loading
        ? <div> Loading... </div>
        : <div className='center'>
          <span className='title'>Credentials</span>
          <Table { ...{ columns, rows, onClick } }></Table>
          <button className='primary' onClick={onAdd}>Add</button>
        </div>}
    </div>
  );
}

export default Claimer;
