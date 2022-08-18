import { useState, useEffect } from 'react';
import { IUser } from '../interfaces/user';
import { IEncryptedMessage } from '@kiltprotocol/sdk-js';
import { buildMessage } from '../api/user/buildMessage';
import { getUserDetails } from '../api/user/userDetails';
import { useNavigate } from 'react-router-dom';

export default function useUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState<null | IUser>(null);
  const [loading, setLoading] = useState(false);

  function loadUser() {
    const userString = localStorage.getItem('user');
    const storedUser: IUser = userString ? JSON.parse(userString) : null;
    setUser(storedUser);
    return storedUser;
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function logout() {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  }

  async function login(session: any) {
    setLoading(true);
    const { encryptionKeyId } = session;

    session.listen(async (msg: IEncryptedMessage) => {
      const didUri = msg.senderKeyUri;
      const { web3name, isAttester } = await getUserDetails(didUri);
      const userData: IUser = { didUri, isAttester, web3name };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setLoading(false);
    });

    const { message } = await buildMessage(encryptionKeyId);
    await session.send(message);
  }

  return {
    user,
    connected: !!user,
    loadUser,
    login,
    logout,
    loading
  };
}
