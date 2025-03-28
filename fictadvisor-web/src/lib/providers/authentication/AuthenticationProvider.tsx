'use client';
import { createContext, FC, PropsWithChildren } from 'react';
import { useQuery } from '@tanstack/react-query';

import AuthAPI from '@/lib/api/auth/AuthAPI';
import { AuthToken } from '@/lib/constants/AuthToken';
import { isServer } from '@/lib/constants/isServer';
import { getClientCookie } from '@/lib/utils/getClientCookie';
import { AuthenticationContextType } from '@/types/authContext';

export const AuthenticationContext = createContext<AuthenticationContextType>({
  user: null,
  isLoading: true,
  refetchUser: () => {},
});

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const accessToken = getClientCookie(AuthToken.AccessToken);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user', accessToken],
    queryFn: AuthAPI.getMe,
    retry: false,
    enabled: !!accessToken,
    refetchOnWindowFocus: false,
  });

  return (
    <AuthenticationContext.Provider
      value={{
        user: data || null,
        isLoading: isLoading || isServer,
        refetchUser: refetch,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
