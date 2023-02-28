import { AuthBody } from '@/lib/api/auth/dto/AuthBody';
import { AuthTelegramBody } from '@/lib/api/auth/dto/AuthTelegramBody';
import { CheckRegisterTelegramDTO } from '@/lib/api/auth/dto/CheckRegisterTelegramDTO';
import { ConfirmPasswordResetBody } from '@/lib/api/auth/dto/ConfirmPasswordResetBody';
import { GetMeDTO } from '@/lib/api/auth/dto/GetMeDTO';
import { RefreshAccessTokenDTO } from '@/lib/api/auth/dto/RefreshAccesTokenDTO';
import { ResetPasswordBody } from '@/lib/api/auth/dto/ResetPasswordBody';
import { ResetPasswordDTO } from '@/lib/api/auth/dto/ResetPasswordDTO';
import { TokensDTO } from '@/lib/api/auth/dto/TokensDTO';
import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { ChangePasswordBody } from './dto/ChangePasswordBody';
import { RegisterBody } from './dto/RegisterBody';

export class AuthAPI {
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
    const { data } = await client.patch(
      '/auth/updatePassword',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async getMe(): Promise<GetMeDTO> {
    const { data } = await client.get(`/auth/me`, getAuthorizationHeader());
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

  static async checkRegisterTelegram(
    token: string,
  ): Promise<CheckRegisterTelegramDTO> {
    const { data } = await client.get(`/auth/checkRegisterTelegram/${token}`);
    return data;
  }
}
