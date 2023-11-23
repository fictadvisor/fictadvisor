import * as process from 'process';

import AuthAPI from '@/lib/api/auth/AuthAPI';
import StorageUtil from '@/lib/utils/StorageUtil';
import { TelegramUser } from '@/types/telegram';

declare global {
  interface Window {
    Telegram: {
      Login: {
        auth: (
          botId: string,
          requestAccess: boolean,
        ) => Promise<TelegramUser | null>;
      };
    };
  }
}

class TelegramService {
  private static async openAuthenticationDialog(): Promise<TelegramUser | null> {
    const Telegram = window.Telegram;
    const botId = process.env.NEXT_PUBLIC_BOT_ID || '';
    const requestAccess = true;

    return new Promise((resolve, reject) => {
      Telegram.Login.auth(botId, requestAccess)
        .then(data => {
          if (data) {
            resolve(data);
          } else {
            reject(new Error('Failed to authenticate'));
          }
        })
        .catch(error => {
          reject(error);
        });
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
