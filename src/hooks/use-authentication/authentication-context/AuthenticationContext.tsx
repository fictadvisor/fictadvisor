import React, { FC, ReactNode, useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { AuthAPI } from '@/lib/api/auth/AuthAPI';
import StorageUtil from '@/lib/utils/StorageUtil';

export const AuthenticationContext = React.createContext(null);

interface AuthenticationProviderProps {
  children: ReactNode;
}

const AuthenticationProvider: FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [jwt, setJwt] = useState(StorageUtil.getTokens());

  const { error, isFetching, data, refetch } = useQuery(
    ['oauth', jwt?.accessToken, jwt?.refreshToken],
    () => AuthAPI.getMe(),
    {
      enabled: jwt != null,
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  if (error && !isFetching) {
    const status = (error as AxiosError).response?.status;

    if (jwt && status === 401) {
      AuthAPI.refreshAccessToken(jwt.refreshToken)
        .then(({ accessToken }) =>
          StorageUtil.setTokens(accessToken, jwt?.refreshToken),
        )
        .catch(async () => {
          StorageUtil.deleteTokens();
        });
    } else {
      StorageUtil.deleteTokens();
    }
  }
  const context = {
    user: data,
    isAuthenticationFetching: isFetching,
    update: async () => {
      setJwt(StorageUtil.getTokens());
      await refetch();
    },
  };

  return (
    <AuthenticationContext.Provider value={context}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
