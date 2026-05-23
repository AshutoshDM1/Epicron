import { useAuth } from '@clerk/react';
import { useEffect } from 'react';
import { setTokenFetcher } from '../../services/api';

export const AuthSync = ({ children }: { children: React.ReactNode }) => {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      setTokenFetcher(getToken);
    } else {
      setTokenFetcher(null);
    }
  }, [getToken, isSignedIn]);

  return <>{children}</>;
};

export default AuthSync;
