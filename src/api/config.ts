export const apiConfig = () => {
  const baseUrl = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:8000';
  const headers = { 'Content-type': 'application/json; charset=UTF-8' };
  return {
    baseUrl,
    headers
  };
};
