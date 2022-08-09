import { useState, useEffect } from 'react';
import { apiConfig } from '../api/config';

export default function useWebsocket(path?: string) {
  const [socket, setSocket] = useState<null | WebSocket>(null);

  const sendMessage = (message = {}) => {
    if (!socket) return;
    socket.send(JSON.stringify(message));
  };

  useEffect(() => {
    const { websocketUrl } = apiConfig();
    const webSocket = new WebSocket(`${websocketUrl}${path}`);
    setSocket(webSocket);
  }, []);

  return {
    socket,
    sendMessage
  };
}
