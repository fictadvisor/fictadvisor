import { useContext } from 'react';

import { AuthenticationContext } from '@/hooks/use-authentication/authentication-context';

const useAuthentication = () => {
  const { user, update } = useContext(AuthenticationContext);

  const isLoggedIn = user != null;

  return {
    user,
    isLoggedIn,
    update,
  };
};

export default useAuthentication;
