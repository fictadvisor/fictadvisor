import { useContext } from 'react';

import { AuthenticationContext } from '@/lib/providers/authentication/AuthenticationProvider';

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      'useAuthenticationContext must be used within an AuthenticationProvider',
    );
  }

  return {
    user: context.user,
    isLoading: context.isLoading,
    refetchUser: context.refetchUser,
  };
};
