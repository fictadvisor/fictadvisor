'use server';
import {
  AuthRefreshResponse,
  OrdinaryStudentResponse,
} from '@fictadvisor/utils/responses';
import { cookies } from 'next/headers';

import { authRefreshPath } from '@/lib/constants/authRefreshPath';
import { AuthToken } from '@/lib/constants/AuthToken';
import { cookieOptions } from '@/lib/constants/cookieOptions';
import { Tokens } from '@/types/tokens';

import { client } from '../instance';

export async function logout() {
  cookies().set(AuthToken.RefreshToken, '', {
    ...cookieOptions,
    maxAge: undefined,
    expires: new Date(0),
  });
  cookies().set(AuthToken.AccessToken, '', {
    ...cookieOptions,
    maxAge: undefined,
    expires: new Date(0),
  });
}

export async function getServerUser() {
  const access_token = cookies().get(AuthToken.AccessToken);

  if (!access_token) {
    throw new Error('No access token found.');
  }

  const { data } = await client.get<OrdinaryStudentResponse>(`/auth/me`);

  return data;
}

export async function setAuthTokens(tokens: Tokens) {
  const { accessToken, refreshToken } = tokens;
  cookies().set(AuthToken.AccessToken, accessToken, cookieOptions);
  cookies().set(AuthToken.RefreshToken, refreshToken, cookieOptions);
}

export async function refreshToken(): Promise<boolean> {
  const refreshToken = cookies().get(AuthToken.RefreshToken);

  if (!refreshToken) {
    return false;
  }

  try {
    const { data } = await client.post<AuthRefreshResponse>(authRefreshPath);
    await setAuthTokens({
      accessToken: data.accessToken,
      refreshToken: refreshToken.value,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function getAccessToken() {
  const AccessToken = cookies().get(AuthToken.AccessToken);
  return AccessToken;
}
