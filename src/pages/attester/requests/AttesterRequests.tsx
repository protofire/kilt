import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onListRequests } from '../../../api/attester/listRequests';
import { IAttesterRequest } from '../../../interfaces/attesterRequest';
import { formatDidUri } from '../../../utils/formatDidUri';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useUser from '../../../hooks/user';
import { getColorByStatus, getLabelByStatus } from '../../../utils/requestStatus';
import useWebsocket from '../../../hooks/websocket';

function AttesterRequests() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const { socket } = useWebsocket();

  // handles the incoming requests through
  // the http connection on first render.
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    onListRequests(user?.didUri)
      .then((requests: IAttesterRequest[]) => requests.map(requestToRow))
      .then(setRows)
      .then(() => setLoading(false));
  }, [ user ]);

  // handles the incoming requests through
  // the websocket connection.
  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (msg: MessageEvent<any>) => {
      handleNewRequest(JSON.parse(msg.data));
    };
  }, [ socket ]);

  const handleNewRequest = (req: IAttesterRequest) => {
    setRows(rows => [requestToRow(req), ...rows ]);
  };

  const requestToRow = (request: IAttesterRequest): Row => ({
    id: request._id,
    values: [
      { value: formatDidUri(request.claimerDidUri) },
      { value: request.ctypeName },
      {
        value: getLabelByStatus(request.status),
        color: getColorByStatus(request.status)
      }
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
