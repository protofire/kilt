import { useState } from 'react';
import { getLoginInfo } from '../api/user/getLoginInfo';
import { getSessionInfo } from '../api/user/userSessionInfo';
import { verifySignature } from '../api/user/verifySignature';
import useUser from './user';

export default function useSporran () {
  const [ loading, setLoading ] = useState(false);
  const [ session, setSession ] = useState<any>();
  const [ connecting, setConnecting ] = useState(false);
  const { saveUser } = useUser();

  async function connect() {
    const sporran = getSporran();
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

  const sporranSignIn = async () => {
    const sporran = getSporran();
    const { message, ownerSignature } = await getLoginInfo();
    const { didKeyUri, signature } = await sporran.signWithDid(message);
    const result = await verifySignature(
      message,
      ownerSignature,
      signature,
      didKeyUri
    );
    return result;
  };

  const login = async () => {
    setLoading(true);
    try {
      const result = await sporranSignIn();
      if (result.success) saveUser(result.token);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSporran = () => window.kilt.sporran;

  return {
    login,
    connect,
    loading,
    session,
    connecting,
    sporranSignIn
  };
}
