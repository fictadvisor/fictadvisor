import { AuthBody } from '@/lib/api/auth/dto/AuthBody';
import { AuthTelegramBody } from '@/lib/api/auth/dto/AuthTelegramBody';
import { CheckRegisterTelegramDTO } from '@/lib/api/auth/dto/CheckRegisterTelegramDTO';
import { ConfirmPasswordResetBody } from '@/lib/api/auth/dto/ConfirmPasswordResetBody';
import { GetMeDTO } from '@/lib/api/auth/dto/GetMeDTO';
import { RefreshAccessTokenDTO } from '@/lib/api/auth/dto/RefreshAccesTokenDTO';
import { ResetPasswordBody } from '@/lib/api/auth/dto/ResetPasswordBody';
import { ResetPasswordDTO } from '@/lib/api/auth/dto/ResetPasswordDTO';
import { TokensDTO } from '@/lib/api/auth/dto/TokensDTO';
import { VerifyEmailBody } from '@/lib/api/auth/dto/VerifyEmailBody';
import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { ChangePasswordBody } from './dto/ChangePasswordBody';
import { RegisterBody } from './dto/RegisterBody';

export class AuthAPI {
  static async groupHasCaptain(groupId: string): Promise<boolean> {
    const { data } = await client.get(`/auth/checkCaptain/${groupId}`);
    return data;
  }

  static async recoverPassword(body: ResetPasswordBody) {
    const { data } = await client.post(
      `user/resetPassword`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async resetPassword(
    resetToken: string,
    body: ResetPasswordBody,
  ): Promise<ResetPasswordDTO> {
    const { data } = await client.patch(
      `/users/resetPassword/${resetToken}`,
      body,
    );
    return data;
  }

  static async refreshAccessToken(
    refreshToken: string,
  ): Promise<RefreshAccessTokenDTO> {
    const { data } = await client.patch('/auth/refresh', null, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    return data;
  }

  static async changePassword(body: ChangePasswordBody): Promise<TokensDTO> {
    const { data } = await client.put(
      '/auth/updatePassword',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async getMe(): Promise<GetMeDTO> {
    const { data } = await client.get(`/auth/me`, getAuthorizationHeader());
    console.log('ПІЗДА ЄБАНА ЗАПРАЦЮЙ');
    return data;
  }

  static async authTelegram(body: AuthTelegramBody): Promise<TokensDTO> {
    const { data } = await client.post('/auth/login', body);
    return data;
  }

  static async auth(body: AuthBody): Promise<TokensDTO> {
    const { data } = await client.post('/auth/login', body);
    return data;
  }

  static async register(body: RegisterBody): Promise<TokensDTO> {
    const { data } = await client.post('/auth/register', body);
    return data;
  }

  static async confirmPasswordReset(body: ConfirmPasswordResetBody) {
    const { data } = await client.post('/users/resetPassword', body);
    return data;
  }

  static async verifyEmail(body: VerifyEmailBody) {
    const { data } = await client.post('/auth/register/verifyEmail', body);
    return data;
  }

  static async verifyEmailToken(token: string): Promise<TokensDTO> {
    const { data } = await client.post(`/auth/register/verifyEmail/${token}`);
    return data;
  }

  static async checkRegisterTelegram(
    token: string,
  ): Promise<CheckRegisterTelegramDTO> {
    const { data } = await client.get(`/auth/checkRegisterTelegram/${token}`);
    return data;
  }
}
