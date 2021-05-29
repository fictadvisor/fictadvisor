import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import config from "../../config";
import api from "../api";
import oauth from "../oauth";

export const AuthenticationContext = React.createContext(null);

export const AuthenticationProvider = ({ children }) => {
  const jwt = oauth.getToken();

  const { error, isFetching, data } = useQuery(
    ['oauth', jwt?.accessToken, jwt?.refreshToken], 
    () => api.oauth.getMe(jwt?.accessToken), 
    { keepPreviousData: false, enabled: jwt != null, retry: false }
  );

  if (error && !isFetching) {
    const status = (error as AxiosError).response?.status;

    if (jwt && status === 401 || status === 403) {
      api.oauth.refresh(jwt.refreshToken)
        .then((t) => oauth.saveToken(t.access_token, t.refresh_token))
        .catch((e) => {
          if (e.response?.status != 500) {
            oauth.logout();
          }
        });
    } else {
      oauth.logout();
    }
  }

  return (
    <AuthenticationContext.Provider value={data}>
      {children}
    </AuthenticationContext.Provider>
  );
};

const loginUrl = `https://t.me/${config.contacts.bot}?start=login`;
const logoutUrl = '/oauth?logout=true'

export const useAuthentication = () => {
  const router = useRouter();

  const login = () => window.location.href = loginUrl;
  const logout = () => router.push(logoutUrl);
  const getToken = () => oauth.getToken()?.accessToken;
  const user = useContext(AuthenticationContext);

  return {
    user,
    getToken,
    loginUrl,
    logoutUrl,
    login,
    logout,
  };
};
