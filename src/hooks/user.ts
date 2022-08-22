import { useState, useEffect, useCallback } from 'react';
import { IUser } from '../interfaces/user';
import { SignWithDidError } from '../interfaces/error';
import { useNavigate } from 'react-router-dom';
import { UUID } from '@kiltprotocol/utils';
import { verifySignature } from '../api/user/verifySignature';
import { getUserDetails } from '../api/user/userDetails';
import { DidUri } from '@kiltprotocol/sdk-js';

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

  async function setUserDetails(didUri: DidUri) {
    const { web3name, isAttester } = await getUserDetails(didUri);
    const userData: IUser = { didUri, isAttester, web3name };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function logout() {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  }

  const login = useCallback(async (sporran: any) => {
    setLoading(true);
    try {
      const message = UUID.generate();
      const { didKeyUri, signature } = await sporran.signWithDid(message);
      const result = await verifySignature(message, signature, didKeyUri);
      if (result.success) {
        setUserDetails(didKeyUri);
      }
    } catch (err) {
      if (err instanceof SignWithDidError) {
        console.error(err.message);
        return;
      }
      console.error(err);
    }
    setLoading(false);
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
