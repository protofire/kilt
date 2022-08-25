import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onListAttesters } from '../../../api/claimer/listAttesters';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import { IAttesterCtype } from '../../../interfaces/attesterCtype';
import { formatDidUri } from '../../../utils/did';

function ClaimerAttesterList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    onListAttesters()
      .then((attesters: IAttesterCtype[]) =>
        setRows([...attesters.map(attesterCtypeToRow)]))
      .then(() => setLoading(false));
  }, []);

  const attesterCtypeToRow = (attesterCtype: IAttesterCtype) => ({
    id: attesterCtype._id,
    values: [
      {
        value: attesterCtype.attesterWeb3name ??
          formatDidUri(attesterCtype.attesterDidUri ?? '')
      },
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
