import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onListRequests } from '../../../api/attester/listRequests';
import { statusToCeil } from '../../../constants/claim-status';
import { IAttesterRequest } from '../../../interfaces/attesterRequest';
import { formatDidUri } from '../../../utils/formatDidUri';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useUser from '../../../hooks/user';

function AttesterRequests() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    onListRequests(user?.didUri)
      .then((requests: IAttesterRequest[]) => requests.map(requestToRow))
      .then(setRows)
      .then(() => setLoading(false));
  }, [ user ]);

  const requestToRow = (request: IAttesterRequest): Row => ({
    id: request._id,
    values: [
      { value: formatDidUri(request.claimerDidUri) },
      { value: request.ctypeName },
      statusToCeil[request.status]
    ]
  });

  const onClick = (id: string | number) => navigate(`${id}`);

  return (
    <div className='wrapper'>
      <Topbar />
      <div className='center'>
        <span className='title'>Claimer requests</span>
        {loading
          ? <div> Loading... </div>
          : <Table
              columns={[
                { name: 'Address' },
                { name: 'CType' },
                { name: 'Status' }]}
              rows={rows}
              onClick={onClick} />}
      </div>
    </div>
  );
}

export default AttesterRequests;
