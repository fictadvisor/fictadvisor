import { useContext } from 'react';

import { AuthenticationContext } from '@/hooks/use-authentication/authentication-context';

const useAuthentication = () => {
  const { user, isAuthenticationFetching } = useContext(AuthenticationContext);

  const isLoggedIn = user != null;

  return {
    user,
    isLoggedIn,
    isAuthenticationFetching,
  };
};

export default useAuthentication;
