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
    // A 401 from the refresh endpoint itself must not trigger another refresh:
    // every attempt builds a fresh config, so the `_retry` flag below cannot
    // stop that recursion and the server would spin forever on a dead session.
    const isRefreshRequest = (
      originalRequest?.url as string | undefined
    )?.includes(authRefreshPath);

    if (
      response?.status === 401 &&
      originalRequest &&
      !isRefreshRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const tokenRefreshed = await refreshToken();

      if (tokenRefreshed) {
        // Drop the stale header and go through `client` so the request
        // interceptor picks up the access token that refreshToken just wrote.
        delete originalRequest.headers.Authorization;
        return client(originalRequest);
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
    const { cookies, headers } = await import('next/headers');
    const cookieStore = await cookies();
    // SSR requests reach the API from the Next.js server, so without this the
    // API's unique-visitor metric would see the web server's IP for every user.
    // Forward the incoming client IP so it is attributed to the real visitor.
    const headerStore = await headers();
    const forwardedFor =
      headerStore.get('x-forwarded-for') ?? headerStore.get('x-real-ip');
    if (forwardedFor) {
      req.headers['x-forwarded-for'] = forwardedFor;
    }
    if (isRefresh) {
      cookieToSet = cookieStore.get(AuthToken.RefreshToken)?.value;
    } else {
      cookieToSet = cookieStore.get(AuthToken.AccessToken)?.value;
    }
  } else {
    for (const cookie of document.cookie.split('; ')) {
      const [key, value] = cookie.split('=');
      if (key === AuthToken.AccessToken && !isRefresh) {
        cookieToSet = value;
        break;
      } else if (key === AuthToken.RefreshToken && isRefresh) {
        cookieToSet = value;
        break;
      }
    }
  }
  req.headers.Authorization = `Bearer ${cookieToSet}`;
  return req;
};

client.interceptors.request.use(authorizationInterceptor);
