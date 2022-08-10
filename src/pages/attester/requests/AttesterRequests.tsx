import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onListRequests } from '../../../api/attester/listRequests';
import { IAttesterRequest } from '../../../interfaces/attesterRequest';
import { formatDidUri } from '../../../utils/formatDidUri';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useUser from '../../../hooks/user';
import { getColorByStatus, getLabelByStatus } from '../../../utils/requestStatus';
import useWebsocket from '../../../hooks/websocket';
import { onListAttesterCtypes } from '../../../api/attester/listAttesterCtypes';

function AttesterRequests() {
  const navigate = useNavigate();
  const { user, loadUser } = useUser();
  const { socket } = useWebsocket();
  const attesterCtypeIds = useRef<string[]>([]);
  const [state, setState] = useState<{ rows: Row[], loading: boolean}>({
    rows: [],
    loading: false
  });

  // handles the incoming requests through
  // the http connection on first render.
  useEffect(() => {
    const currentUser = user ?? loadUser();
    setState(s => ({ ...s, loading: true }));
    Promise.all([
      onListRequests(currentUser.didUri),
      onListAttesterCtypes(currentUser.didUri)
    ]).then(([requests, ctypes]) => {
      attesterCtypeIds.current = ctypes.map(c => c.ctypeId);
      setState(s => ({
        rows: requests.map(requestToRow),
        loading: false
      }));
    });
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
    if (attesterCtypeIds.current.length === 0) return;
    // filter the ctypes that correspond to the current
    // attester.
    const isValid = attesterCtypeIds.current.includes(req.ctypeId);
    if (!isValid) return;
    setState((s) => ({ ...s, rows: [requestToRow(req), ...state.rows ] }));
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
        {state.loading
          ? <div> Loading... </div>
          : <Table
              columns={[
                { name: 'Address' },
                { name: 'CType' },
                { name: 'Status' }]}
              rows={state.rows}
              onClick={onClick} />}
      </div>
    </div>
  );
}

export default AttesterRequests;
