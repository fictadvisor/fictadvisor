import * as process from 'process';

import { AuthAPI } from '@/lib/api/auth/AuthAPI';
import { AuthTelegramBody } from '@/lib/api/auth/dto/AuthTelegramBody';
import StorageUtil from '@/lib/utils/StorageUtil';

class TelegramService {
  private static openAuthenticationDialog() {
    return new Promise((resolve, reject) => {
      try {
        const Telegram = (window as any).Telegram;
        Telegram.Login.auth(
          { bot_id: process.env.NEXT_PUBLIC_BOT_ID, request_access: true },
          data => {
            return data
              ? resolve(data)
              : reject(new Error('Failed to authenticate'));
          },
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  static async login(): Promise<boolean> {
    try {
      const data: AuthTelegramBody =
        (await TelegramService.openAuthenticationDialog()) as AuthTelegramBody;
      const { accessToken, refreshToken } = await AuthAPI.authTelegram(data);
      StorageUtil.setTokens(accessToken, refreshToken);

      return true;
    } catch (e) {
      return false;
    }
  }

  static async register() {
    const data: AuthTelegramBody =
      (await TelegramService.openAuthenticationDialog()) as AuthTelegramBody;
    StorageUtil.setTelegramInfo({ telegram: data });
  }
}

export default TelegramService;
