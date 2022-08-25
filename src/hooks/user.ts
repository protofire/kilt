import { useState, useEffect } from 'react';
import { IUser } from '../interfaces/user';
import { useNavigate } from 'react-router-dom';
import * as jwt from 'jose';
import { checkToken } from '../api/user/checkToken';

export default function useUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState<null | IUser>(null);

  function loadUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const payload = jwt.decodeJwt(token);
      if (!payload.sub) return;

      const storedUser: IUser = JSON.parse(payload.sub);
      setUser(storedUser);
      return storedUser;
    } catch (err) {
      console.error(err);
      logout();
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function logout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/', { replace: true });
  }

  async function verify() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const result = await checkToken(token);
    return result;
  }

  function saveUser(token: string) {
    localStorage.setItem('token', token);
    const payload: unknown = jwt.decodeJwt(token);
    setUser(payload as IUser);
  };

  return {
    user,
    loadUser,
    logout,
    saveUser,
    verify
  };
}
