import axios from 'axios';

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
const cookiesInterceptor = async (req: any) => {
  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookiesString = cookies()
      .getAll()
      .map(item => `${item.name}=${item.value}`)
      .join('; ');
    req.headers.Cookie = cookiesString;
  }
  return req;
};

client.interceptors.request.use(cookiesInterceptor);
