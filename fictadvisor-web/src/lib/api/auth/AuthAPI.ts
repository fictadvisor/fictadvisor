import {
  ForgotPasswordDTO,
  LoginDTO,
  RegistrationDTO,
  ResetPasswordDTO,
  TelegramDTO,
  UpdatePasswordDTO,
  VerificationEmailDTO,
} from '@fictadvisor/utils/requests';
import {
  AuthRefreshResponse,
  IsAvailableResponse,
  OrdinaryStudentResponse,
  ResetPasswordResponse,
  TelegramRegistrationResponse,
} from '@fictadvisor/utils/responses';

import { getAuthorizationHeader } from '@/lib/api/utils';
import StorageUtil from '@/lib/utils/StorageUtil';
import { Tokens } from '@/types/tokens';

import { client } from '../instance';

class AuthAPI {
  async groupHasCaptain(groupId: string) {
    const { data } = await client.get<boolean>(`/auth/checkCaptain/${groupId}`);
    return data;
  }

  async resetPassword(resetToken: string, body: ResetPasswordDTO) {
    const { data } = await client.post<ResetPasswordResponse>(
      `/auth/resetPassword/${resetToken}`,
      body,
    );
    return data;
  }

  async refreshAccessToken(accessToken: string) {
    const { data } = await client.post<AuthRefreshResponse>(
      '/auth/refresh',
      { accessToken },
      {
        headers: {
          Authorization: `Bearer ${StorageUtil.getTokens()?.refreshToken}`,
        },
      },
    );
    return data;
  }

  async changePassword(body: UpdatePasswordDTO) {
    const { data } = await client.put<Tokens>(
      '/auth/updatePassword',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getMe() {
    const { data } = await client.get<OrdinaryStudentResponse>(
      `/auth/me`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async authTelegram(body: TelegramDTO) {
    const { data } = await client.post<Tokens>('/auth/loginTelegram', body);
    return data;
  }

  async auth(body: LoginDTO) {
    const { data } = await client.post<Tokens>('/auth/login', body);
    return data;
  }

  async register(body: RegistrationDTO) {
    const { data } = await client.post<Tokens>('/auth/register', body);
    return data;
  }

  async forgotPassword(body: ForgotPasswordDTO): Promise<void> {
    await client.post('/auth/forgotPassword', body);
  }

  async checkResetToken(token: string) {
    const { data } = await client.get<IsAvailableResponse>(
      'auth/checkResetToken/' + token,
    );
    return data;
  }

  async verifyEmail(body: VerificationEmailDTO): Promise<void> {
    await client.post('/auth/register/verifyEmail', body);
  }

  async verifyEmailToken(token: string) {
    const { data } = await client.post<Tokens>(
      `/auth/register/verifyEmail/${token}`,
    );
    return data;
  }

  async checkRegisterTelegram(token: string) {
    const { data } = await client.get<TelegramRegistrationResponse>(
      `/auth/checkRegisterTelegram/${token}`,
    );
    return data;
  }
}

export default new AuthAPI();
