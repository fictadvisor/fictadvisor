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
  const cookieStore = await cookies();

  cookieStore.set(AuthToken.RefreshToken, '', {
    ...cookieOptions,
    maxAge: undefined,
    expires: new Date(0),
  });
  cookieStore.set(AuthToken.AccessToken, '', {
    ...cookieOptions,
    maxAge: undefined,
    expires: new Date(0),
  });
}

export async function getServerUser() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get(AuthToken.AccessToken);

  if (!access_token) {
    throw new Error('No access token found.');
  }

  const { data } = await client.get<OrdinaryStudentResponse>(`/auth/me`);

  return data;
}

export async function setAuthTokens(tokens: Tokens) {
  const cookieStore = await cookies();
  const { accessToken, refreshToken } = tokens;

  cookieStore.set(AuthToken.AccessToken, accessToken, cookieOptions);
  cookieStore.set(AuthToken.RefreshToken, refreshToken, cookieOptions);
}

export async function refreshToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(AuthToken.RefreshToken);

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
  const cookieStore = await cookies();
  return cookieStore.get(AuthToken.AccessToken);
}
