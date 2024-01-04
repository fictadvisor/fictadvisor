import { NextRouter } from 'next/router';

import AuthAPI from '@/lib/api/auth/AuthAPI';
import { AuthBody } from '@/lib/api/auth/types/AuthBody';
import { RegisterBody } from '@/lib/api/auth/types/RegisterBody';
import TelegramService from '@/lib/services/telegram';
import StorageUtil from '@/lib/utils/StorageUtil';

class AuthService {
  static async logout() {
    StorageUtil.deleteTokens();
    StorageUtil.deleteTelegramInfo();
  }

  static async login(data: AuthBody) {
    const tokens = await AuthAPI.auth(data);
    StorageUtil.setTokens(tokens.accessToken, tokens.refreshToken);
  }

  static async loginTelegram(): Promise<boolean> {
    return await TelegramService.login();
  }

  static async register(data: RegisterBody) {
    const telegramInfo = StorageUtil.getTelegramInfo();
    StorageUtil.deleteTelegramInfo();
    if (telegramInfo) {
      const obj = {
        ...data,
        telegram: telegramInfo.telegram,
      };
      await AuthAPI.register(obj);
    } else await AuthAPI.register(data);
  }

  static async redirectToRegisterBot(router: NextRouter) {
    const botUrl = `https://t.me/${process.env.NEXT_PUBLIC_BOT_NAME}?start=start`;
    await router.push(botUrl);
  }

  static async registerTelegram() {
    await TelegramService.register();
  }
}

export default AuthService;
