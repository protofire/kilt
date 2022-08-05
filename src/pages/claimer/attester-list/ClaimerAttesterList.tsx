import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useClaimer from '../../../hooks/claimer';
import useUser from '../../../hooks/user';
import { IAttesterCtype } from '../../../interfaces/attester-ctype';
import { formatDid } from '../../../utils/string';

function ClaimerAttesterList() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { onListAttesters, loading } = useClaimer();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if (!user) return;
    onListAttesters(user.did).then((attesters: IAttesterCtype[]) => {
      setRows([...attesters.map(attesterCtypeToRow)]);
    });
  }, [ user ]);

  const attesterCtypeToRow = (attesterCtype: IAttesterCtype) => ({
    id: attesterCtype._id,
    values: [
      { value: formatDid(attesterCtype.attesterDid) },
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
