import { useState, useEffect, useCallback } from 'react';
import { IUser } from '../interfaces/user';
import { useNavigate } from 'react-router-dom';
import { verifySignature } from '../api/user/verifySignature';
import { getLoginInfo } from '../api/user/getLoginInfo';
import * as jwt from 'jose';

export default function useUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState<null | IUser>(null);
  const [loading, setLoading] = useState(false);

  function loadUser() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload: unknown = jwt.decodeJwt(token);
    const storedUser = payload as IUser;
    setUser(storedUser);
    return storedUser;
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function logout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  }

  async function sporranSignIn(sporran: any) {
    const { message, ownerSignature } = await getLoginInfo();
    const { didKeyUri, signature } = await sporran
      .signWithDid(message);
    const result = await verifySignature(
      message,
      ownerSignature,
      signature,
      didKeyUri
    );
    return result;
  }

  function saveUser(token: string) {
    localStorage.setItem('token', token);
    const payload: unknown = jwt.decodeJwt(token);
    setUser(payload as IUser);
  };

  function setAuthToken(token: string) {

  }

  const login = useCallback(async (sporran: any) => {
    setLoading(true);
    try {
      const result = await sporranSignIn(sporran);
      if (result.success) saveUser(result.token);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loadUser,
    login,
    logout,
    loading
  };
}
