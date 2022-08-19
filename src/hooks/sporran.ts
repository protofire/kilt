import { useState, useEffect } from 'react';
import { getSessionInfo } from '../api/user/userSessionInfo';

export default function useSporran () {
  const [ sporran, setSporran ] = useState<any>(null);
  const [ session, setSession ] = useState<any>();
  const [ connecting, setConnecting ] = useState(false);

  async function connect() {
    if (!sporran) return;
    setConnecting(true);

    const {
      dappName,
      dAppEncryptionKeyUri,
      challenge
    } = await getSessionInfo();

    const session = await sporran.startSession(
      dappName,
      dAppEncryptionKeyUri,
      challenge
    );

    localStorage.setItem('session', JSON.stringify(session));
    setSession(session);
    setConnecting(false);
    return session;
  }

  useEffect(() => {
    const inState = !!sporran;
    const inWindow = window.kilt && window.kilt.sporran;
    if (!inState && inWindow) {
      setSporran(window.kilt.sporran);
    }

    if (!inState) {
      window.kilt = new Proxy({}, {
        set(target: any, prop, value) {
          if (prop === 'sporran') {
            setSporran(value);
          }
          return !!(target[prop] = value);
        }
      });
    }
  });

  return {
    connect,
    session,
    connecting,
    sporran
  };
}
