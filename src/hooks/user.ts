import { useState, useEffect } from 'react';
import useSporran from './sporran';
import { IUser } from '../interfaces/user';
import { DidUri } from '@kiltprotocol/sdk-js';
import { getUserDetails } from '../api/attester/userDetails';

export default function useUser() {
  const [user, setUser] = useState<null | IUser>(null);
  const { sporran } = useSporran();

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
    window.location.reload();
  }

  async function login(didUri: DidUri) {
    if (!sporran) return;
    const { signature, didKeyUri }: IUser = await sporran.signWithDid(didUri);
    const { web3name, isAttester } = await getUserDetails(didUri);
    const userData: IUser = { didUri, signature, didKeyUri, isAttester, web3name };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }

  return {
    user,
    connected: !!user,
    loadUser,
    login,
    logout
  };
}
