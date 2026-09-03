import { TelegramDTO } from '@fictadvisor/utils/requests';

import AuthAPI from '@/lib/api/auth/AuthAPI';
import { setAuthTokens } from '@/lib/api/auth/ServerAuthApi';
import StorageUtil from '@/lib/utils/StorageUtil';
import { TelegramUser } from '@/types/telegram';

class TelegramService {
  private static openAuthenticationDialog() {
    return new Promise((resolve, reject) => {
      try {
        // @ts-ignore
        const Telegram = window.Telegram;
        Telegram.Login.auth(
          { bot_id: process.env.NEXT_PUBLIC_BOT_ID, request_access: true },

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
        (await TelegramService.openAuthenticationDialog()) as TelegramDTO;
      const tokens = await AuthAPI.authTelegram(data);
      await setAuthTokens(tokens);
      return true;
    } catch (e) {
      return false;
    }
  }
  static async register() {
    // Never retry the dialog here: the second `window.open` would happen after
    // an await, outside the user gesture, so the browser blocks it and the real
    // reason for the first failure is lost. Let the caller show the error.
    const data =
      (await TelegramService.openAuthenticationDialog()) as TelegramUser;
    StorageUtil.setTelegramInfo({ telegram: data });
  }

  static async redirectToRegisterBot() {
    const botUrl = `https://t.me/${process.env.NEXT_PUBLIC_BOT_NAME}?start=start`;
    window.open(botUrl, '_blank');
  }
}
export default TelegramService;
