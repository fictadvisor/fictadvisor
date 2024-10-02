'use server';
import {
  AuthRefreshResponse,
  OrdinaryStudentResponse,
} from '@fictadvisor/utils/responses';
import { cookies } from 'next/headers';

import { AuthToken } from '@/lib/constants/AuthToken';
import { Tokens } from '@/types/tokens';

import { client } from '../instance';

export async function logout() {
  cookies().delete(AuthToken.AccessToken);
  cookies().delete(AuthToken.RefreshToken);
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
  cookies().set(AuthToken.AccessToken, accessToken, {
    secure: true,
    sameSite: 'none',
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7,
    domain:
      process.env.NODE_ENV === 'production' ? '.ficeadvisor.com' : undefined,
  });
  cookies().set(AuthToken.RefreshToken, refreshToken, {
    secure: true,
    sameSite: 'none',
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 30,
    domain:
      process.env.NODE_ENV === 'production' ? '.ficeadvisor.com' : undefined,
  });
}

export async function refreshToken(): Promise<boolean> {
  const refreshToken = cookies().get(AuthToken.RefreshToken);

  if (!refreshToken) {
    return false;
  }

  try {
    const { data } = await client.post<AuthRefreshResponse>('auth/refresh');
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
