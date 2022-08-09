import { useState, useEffect } from 'react';
import { apiConfig } from '../api/config';

export default function useWebsocket() {
  const [socket, setSocket] = useState<null | WebSocket>(null);

  const sendMessage = (message = {}) => {
    if (!socket) return;
    socket.send(JSON.stringify(message));
  };

  useEffect(() => {
    const { websocketUrl } = apiConfig();
    const webSocket = new WebSocket(`${websocketUrl}`);
    setSocket(webSocket);
  }, []);

  return {
    socket,
    sendMessage
  };
}
