import { useState, useEffect } from 'react';
import useSporran from './sporran';

let _user: string | null
export default function useUser() {
  const [ user, setUser ] = useState(_user);
  const [ isAttester ] = useState(false);
  const { sporran, session, startSession, presentCredential } = useSporran();
  
  useEffect(() => {
    (async () => {
      if (!!user) return
      const result = await (await fetch('https://someapi.com/api/user')).text()
      _user = !!result ? result : null
      setUser(_user)
    })()
  }, [ session, user ]);

  async function logout() {
    const loggedOut = (await fetch('https://someapi.com/api/logout')).ok
    if (!loggedOut) return
    _user = null
     setUser(null)
  }

  async function login() {
    if (!sporran) return
    if (!session) return await startSession()
    await presentCredential()
    const result = await (await fetch('https://someapi.com/api/user')).text()
    _user = !!result ? result : null
    setUser(_user)
    return _user
  }

  return {
    user,
    isAttester,
    connected: !!user || !!session,
    login, 
    logout,
  }
}