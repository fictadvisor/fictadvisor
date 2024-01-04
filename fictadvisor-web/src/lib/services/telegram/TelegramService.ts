import * as process from 'process';

import AuthAPI from '@/lib/api/auth/AuthAPI';
import StorageUtil from '@/lib/utils/StorageUtil';
import { TelegramUser } from '@/types/telegram';

class TelegramService {
  private static openAuthenticationDialog() {
    return new Promise((resolve, reject) => {
      try {
        // TODO: refactor whole service
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const Telegram = window.Telegram;
        Telegram.Login.auth(
          { bot_id: process.env.NEXT_PUBLIC_BOT_ID, request_access: true },
          // TODO: rewrite whole service
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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
      const data =
        (await TelegramService.openAuthenticationDialog()) as TelegramUser;
      const { accessToken, refreshToken } = await AuthAPI.authTelegram(data);
      StorageUtil.setTokens(accessToken, refreshToken);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async register() {
    try {
      const data =
        (await TelegramService.openAuthenticationDialog()) as TelegramUser;
      StorageUtil.setTelegramInfo({ telegram: data });
    } catch (e) {
      const data =
        (await TelegramService.openAuthenticationDialog()) as TelegramUser;
      StorageUtil.setTelegramInfo({ telegram: data });
    }
  }
}

export default TelegramService;
