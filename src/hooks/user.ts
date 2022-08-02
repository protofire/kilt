import { useState, useEffect } from 'react';
import useSporran from './sporran';
import { IUser } from '../interfaces/user';
import useAttester from './attester';

export default function useUser() {
  const [ user, setUser ] = useState<null | IUser>(null);
  const { sporran } = useSporran();
  const { checkDidAttester } = useAttester();

  useEffect(() => {
    if (user) return;
    const userString = localStorage.getItem('user');
    const storedUser: IUser = userString ? JSON.parse(userString) : null;
    setUser(storedUser);
  }, []);

  async function logout() {
    localStorage.removeItem('user');
    setUser(null);
  }

  async function login(did: string) {
    if (!sporran) return;
    const { signature, didKeyUri }: IUser = await sporran.signWithDid(did);
    const isAttester = await checkDidAttester(did);
    const userData: IUser = { did, signature, didKeyUri, isAttester };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }

  return {
    user,
    connected: !!user,
    login,
    logout
  };
}
