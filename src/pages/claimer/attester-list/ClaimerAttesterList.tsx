import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onListAttesters } from '../../../api/claimer/listAttesters';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useUser from '../../../hooks/user';
import { IAttesterCtype } from '../../../interfaces/attester-ctype';
import { formatDidUri } from '../../../utils/formatDidUri';

function ClaimerAttesterList() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    onListAttesters(user.didUri)
      .then((attesters: IAttesterCtype[]) =>
        setRows([...attesters.map(attesterCtypeToRow)]))
      .then(() => setLoading(false));
  }, [ user ]);

  const attesterCtypeToRow = (attesterCtype: IAttesterCtype) => ({
    id: attesterCtype._id,
    values: [
      { value: formatDidUri(attesterCtype.attesterDidUri) },
      { value: attesterCtype.ctypeName },
      { value: attesterCtype.quote + ' KILT' }
    ]
  }) as Row;

  const onClick = (id: string | number) => navigate(`claim/${id}`);

  return (
    <div className='wrapper'>
      <Topbar />
      {loading
        ? <div> Loading... </div>
        : <div className='center'>
          <span className='title'> Attesters </span>
          <Table
            columns={[{ name: 'Name' }, { name: 'CType' }, { name: 'Quote' }]}
            rows={rows}
            onClick={onClick} />
        </div>}
    </div>
  );
}

export default ClaimerAttesterList;
