import axios from 'axios';

import { authRefreshPath } from '@/lib/constants/authRefreshPath';
import { AuthToken } from '@/lib/constants/AuthToken';

import { isServer } from '../constants/isServer';

import { refreshToken } from './auth/ServerAuthApi';

const baseURL = !isServer
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : process.env.API_BASE_URL;

export const client = axios.create({ baseURL, withCredentials: true });

client.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const { response, config: originalRequest } = error;

    if (response?.status === 401) {
      const tokenRefreshed = await refreshToken();

      if (tokenRefreshed) {
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authorizationInterceptor = async (req: any) => {
  const isRefresh = (req.url as string).includes(authRefreshPath);
  let cookieToSet;
  if (isServer) {
    const { cookies } = await import('next/headers');
    if (isRefresh) {
      cookieToSet = cookies().get(AuthToken.RefreshToken);
    } else {
      cookieToSet = cookies().get(AuthToken.AccessToken);
    }
  } else {
    for (const cookie of document.cookie.split('; ')) {
      const [key, value] = cookie.split('=');
      if (key === 'refresh_token' && !isRefresh) {
        cookieToSet = value;
        break;
      } else if (key === 'access_token' && isRefresh) {
        cookieToSet = value;
        break;
      }
    }
  }
  req.headers.Authorization = `Bearer ${cookieToSet}`;
  return req;
};

client.interceptors.request.use(authorizationInterceptor);
