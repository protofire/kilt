import { useEffect, useRef, useState } from 'react';
import { onListAttesterCtypes } from '../api/attester/listAttesterCtypes';
import { onListRequests } from '../api/attester/listRequests';
import { Row } from '../components/Table/Table';
import { IAttesterRequest } from '../interfaces/attesterRequest';
import { formatDidUri } from '../utils/formatDidUri';
import { getColorByStatus, getLabelByStatus } from '../utils/requestStatus';
import useUser from './user';
import useWebsocket from './websocket';

interface HookState {
  rows: Row[],
  loading: boolean
}

export const useAttesterRequests = () => {
  const { user, loadUser } = useUser();
  const { socket } = useWebsocket();
  const attesterCtypeIds = useRef<string[]>([]);
  const [state, setState] = useState<HookState>({
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
      setState({
        rows: requests.map(requestToRow),
        loading: false
      });
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
    setState((s) => ({ ...s, rows: [requestToRow(req), ...s.rows ] }));
  };

  const requestToRow = (request: IAttesterRequest): Row => ({
    id: request._id,
    values: [
      {
        value: request.claimerWeb3name ??
        formatDidUri(request.claimerDid)
      },
      { value: request.ctypeName },
      {
        value: getLabelByStatus(request.status),
        color: getColorByStatus(request.status)
      }
    ]
  });

  return {
    ...state
  };
};
