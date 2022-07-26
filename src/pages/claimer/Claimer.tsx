import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onListCredentials } from '../../api/claimer/listCredentials';
import Table, { Row } from '../../components/Table/Table';
import Topbar from '../../components/Topbar/Topbar';
import { ICredential } from '../../interfaces/credential';
import { formatDidUri } from '../../utils/did';
import { getColorByStatus, getLabelByStatus } from '../../utils/status';

function Claimer() {
  const navigate = useNavigate();
  const [ rows, setRows ] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    onListCredentials()
      .then((credentials: ICredential[]) => {
        setRows([...credentials.map(credentialToRow)]);
        setLoading(false);
      });
  }, []);

  const credentialToRow = (credential: ICredential) => ({
    id: credential._id,
    values: [
      { value: credential.label },
      {
        value: credential.attesterWeb3name ??
          formatDidUri(credential.attesterDidUri)
      },
      {
        value: getLabelByStatus(credential.status),
        color: getColorByStatus(credential.status)
      }
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
