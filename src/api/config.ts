export const apiConfig = () => {
  const baseUrl = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:8000';
  const websocketUrl = process.env.REACT_APP_WS_BASE_URL ?? 'ws://localhost:8000/websockets';
  const headers = { 'Content-type': 'application/json; charset=UTF-8' };
  return {
    baseUrl,
    headers,
    websocketUrl
  };
};
