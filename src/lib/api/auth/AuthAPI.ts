import { CheckRegisterTelegramDTO } from '@/lib/api/auth/dto/CheckRegisterTelegramDTO';
import { GetMeDTO } from '@/lib/api/auth/dto/GetMeDTO';

import { client, getAuthorizationHeader } from '../index';

import { authBody } from './dto/authBody';
import { authTelegramBody } from './dto/authTelegramBody';
import { changePasswordBody } from './dto/changePasswordBody';
import { confirmPasswordResetBody } from './dto/confirmPasswordResetBody';
import { refreshAccessTokenDTO } from './dto/refreshAccesTokenDTO';
import { registerBody } from './dto/registerBody';
import { resetPasswordBody } from './dto/resetPasswordBody';
import { resetPasswordDTO } from './dto/resetPasswordDTO';
import { tokensDTO } from './dto/tokensDTO';

export class AuthAPI {
  static async recoverPassword(
    accessToken: string,
    password: string,
    body: resetPasswordBody,
  ) {
    return await client.post(
      `user/resetPassword`,
      body,
      getAuthorizationHeader(accessToken),
    );
  }

  static async resetPassword(
    resetToken: string,
    body: resetPasswordBody,
  ): Promise<resetPasswordDTO> {
    return (await client.patch(`/users/resetPassword/${resetToken}`, body))
      .data;
  }

  static async refreshAccessToken(
    refreshToken: string,
  ): Promise<refreshAccessTokenDTO> {
    return (
      await client.patch(
        '/auth/refresh',
        null,
        getAuthorizationHeader(refreshToken),
      )
    ).data;
  }

  static async changePassword(
    accessToken: string,
    body: changePasswordBody,
  ): Promise<tokensDTO> {
    return (
      await client.patch(
        '/auth/updatePassword',
        body,
        getAuthorizationHeader(accessToken),
      )
    ).data;
  }

  static async getMe(accessToken: string): Promise<GetMeDTO> {
    return await client.get(`/auth/me`, getAuthorizationHeader(accessToken));
  }

  static async authTelegram(body: authTelegramBody): Promise<tokensDTO> {
    return (await client.post('/auth/login', body)).data;
  }

  static async auth(body: authBody): Promise<tokensDTO> {
    return (await client.post('/auth/login', body)).data;
  }

  static async register(body: registerBody): Promise<tokensDTO> {
    return (await client.post('/auth/register', body)).data;
  }

  static async confirmPasswordReset(body: confirmPasswordResetBody) {
    return (await client.post('/users/resetPassword', body)).data;
  }

  static async checkRegisterTelegram(
    token: string,
  ): Promise<CheckRegisterTelegramDTO> {
    const res = await client.get(`/auth/checkRegisterTelegram/${token}`);
    return res.data;
  }
}
