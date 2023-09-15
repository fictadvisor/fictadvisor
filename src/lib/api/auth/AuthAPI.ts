import { AuthBody } from '@/lib/api/auth/types/AuthBody';
import { ChangePasswordBody } from '@/lib/api/auth/types/ChangePasswordBody';
import { CheckRegisterTelegramResponse } from '@/lib/api/auth/types/CheckRegisterTelegramResponse';
import { ForgotPasswordBody } from '@/lib/api/auth/types/ForgotPasswordBody';
import { RefreshAccessTokenResponse } from '@/lib/api/auth/types/RefreshAccesTokenResponse';
import { RegisterBody } from '@/lib/api/auth/types/RegisterBody';
import { ResetPasswordBody } from '@/lib/api/auth/types/ResetPasswordBody';
import { ResetPasswordResponse } from '@/lib/api/auth/types/ResetPasswordResponse';
import { VerifyEmailBody } from '@/lib/api/auth/types/VerifyEmailBody';
import { getAuthorizationHeader } from '@/lib/api/utils';
import { TelegramUser } from '@/types/telegram';
import { Tokens } from '@/types/tokens';
import { User } from '@/types/user';

import { client } from '../instance';

class AuthAPI {
  async groupHasCaptain(groupId: string) {
    const { data } = await client.get<boolean>(`/auth/checkCaptain/${groupId}`);
    return data;
  }

  async resetPassword(resetToken: string, body: ResetPasswordBody) {
    const { data } = await client.post<ResetPasswordResponse>(
      `/auth/resetPassword/${resetToken}`,
      body,
    );
    return data;
  }

  async refreshAccessToken(refreshToken: string) {
    const { data } = await client.post<RefreshAccessTokenResponse>(
      '/auth/refresh',
      { accessToken: refreshToken },
      getAuthorizationHeader(),
    );
    return data;
  }

  async changePassword(body: ChangePasswordBody) {
    const { data } = await client.put<Tokens>(
      '/auth/updatePassword',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getMe() {
    const { data } = await client.get<User>(
      `/auth/me`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async authTelegram(body: TelegramUser) {
    const { data } = await client.post<Tokens>('/auth/loginTelegram', body);
    return data;
  }

  async auth(body: AuthBody) {
    const { data } = await client.post<Tokens>('/auth/login', body);
    return data;
  }

  async register(body: RegisterBody) {
    const { data } = await client.post<Tokens>('/auth/register', body);
    return data;
  }

  async forgotPassword(body: ForgotPasswordBody) {
    const { data } = await client.post('/auth/forgotPassword', body);
    return data;
  }

  async checkResetToken(token: string) {
    const { data } = await client.get(`auth/checkResetToken/${token}`);
    return data;
  }

  async verifyEmail(body: VerifyEmailBody) {
    const { data } = await client.post('/auth/register/verifyEmail', body);
    return data;
  }

  async verifyEmailToken(token: string) {
    const { data } = await client.post<Tokens>(
      `/auth/register/verifyEmail/${token}`,
    );
    return data;
  }

  async checkRegisterTelegram(token: string) {
    const { data } = await client.get<CheckRegisterTelegramResponse>(
      `/auth/checkRegisterTelegram/${token}`,
    );
    return data;
  }
}

export default new AuthAPI();
