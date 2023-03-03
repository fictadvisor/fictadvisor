import { useContext } from 'react';

import { AuthenticationContext } from '@/hooks/use-authentication/authentication-context';

const useAuthentication = () => {
  const { user, isAuthenticationFetching, update } = useContext(
    AuthenticationContext,
  );

  const isLoggedIn = user != null;

  return {
    user,
    isLoggedIn,
    isAuthenticationFetching,
    update,
  };
};

export default useAuthentication;
