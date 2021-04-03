import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import api from "../api";
import oauth from "../oauth";

export const AuthenticationContext = React.createContext(null);

export const AuthenticationProvider = ({ children }) => {
  const jwt = oauth.getToken();
  const { data } = useQuery(
    ['oauth', jwt?.accessToken, jwt?.refreshToken], 
    () => api.oauth.getMe(jwt?.accessToken), 
    { keepPreviousData: false, enabled: jwt != null }
  );

  return (
    <AuthenticationContext.Provider value={data}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const router = useRouter();

  const loginUrl = 'https://t.me/fictadvisor_bot?start=login';
  const login = () => window.location.href = loginUrl;
  const logout = () => router.push('/oauth?logout=true');
  const user = useContext(AuthenticationContext);

  return {
    user,
    loginUrl,
    login,
    logout,
  };
};
