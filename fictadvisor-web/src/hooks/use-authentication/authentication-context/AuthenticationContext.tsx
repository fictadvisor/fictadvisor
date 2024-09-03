'use client';

import React, {
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import AuthAPI from '@/lib/api/auth/AuthAPI';
import StorageUtil from '@/lib/utils/StorageUtil';
import { User } from '@/types/user';

import { AuthenticationContext } from '../types';

const authenticationContext = React.createContext<AuthenticationContext>({
  update: () => new Promise(() => {}),
  user: {} as User,
});

export const useAuthenticationContext = () => useContext(authenticationContext);

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [jwt, setJwt] = useState(StorageUtil.getTokens());
  const qc = useQueryClient();

  const { error, isFetched, isError, data } = useQuery({
    queryKey: ['oauth', jwt?.accessToken, jwt?.refreshToken],
    queryFn: () => AuthAPI.getMe(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (error) {
    const status = (error as AxiosError).response?.status;
    if (jwt && status === 401) {
      AuthAPI.refreshAccessToken(jwt.accessToken)
        .then(async ({ accessToken }) => {
          StorageUtil.setTokens(accessToken, jwt?.refreshToken);
          await qc.refetchQueries({
            queryKey: ['oauth', jwt?.accessToken, jwt?.refreshToken],
          });
        })
        .catch(async () => {
          StorageUtil.deleteTokens();
        });
    } else {
      StorageUtil.deleteTokens();
    }
  }
  const context: AuthenticationContext = useMemo(
    () => ({
      user: data as User,
      update: async () => {
        setJwt(StorageUtil.getTokens());
        await qc.refetchQueries({
          queryKey: ['oauth', jwt?.accessToken, jwt?.refreshToken],
        });
      },
    }),
    [data, qc],
  );

  return (
    <authenticationContext.Provider value={context}>
      {(isFetched || isError) && children}
    </authenticationContext.Provider>
  );
};

export default AuthenticationProvider;
