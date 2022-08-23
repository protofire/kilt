import { useState, useEffect, useCallback } from 'react';
import { IUser } from '../interfaces/user';
import { SignWithDidError } from '../interfaces/error';
import { useNavigate } from 'react-router-dom';
import { verifySignature } from '../api/user/verifySignature';
import { getLoginInfo } from '../api/user/getLoginInfo';

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

  async function sporranSignIn(sporran: any) {
    const { message } = await getLoginInfo();
    const { didKeyUri, signature } = await sporran.signWithDid(message);
    const result = await verifySignature(message, signature, didKeyUri);
    return result;
  }

  const login = useCallback(async (sporran: any) => {
    setLoading(true);
    try {
      const result = await sporranSignIn(sporran);
      console.log(result);
      if (result.success) {
        // result.body should contain the signed token.
        const userData: IUser = result;
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      }
    } catch (err) {
      if (err instanceof SignWithDidError) {
        console.error(err.message);
        return;
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    connected: !!user,
    loadUser,
    login,
    logout,
    loading
  };
}
