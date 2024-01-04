import { useAuthenticationContext } from '@/hooks/use-authentication/authentication-context';
import { UseAuthenticationReturn } from '@/hooks/use-authentication/types';

const useAuthentication = (): UseAuthenticationReturn => {
  const { user, update } = useAuthenticationContext();

  const isLoggedIn = !!user;

  return {
    user,
    isLoggedIn,
    update,
  };
};

export default useAuthentication;
