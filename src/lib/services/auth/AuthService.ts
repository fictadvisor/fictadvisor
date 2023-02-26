import { NextRouter } from 'next/router';

import config from '@/config';
import { AuthAPI } from '@/lib/api/auth/AuthAPI';
import { authBody } from '@/lib/api/auth/dto/authBody';
import TelegramService from '@/lib/services/telegram';
import StorageUtil from '@/lib/utils/StorageUtil';
import storageUtil from '@/lib/utils/StorageUtil';

class AuthService {
  static async logout() {
    StorageUtil.deleteTokens();
  }

  static async login(data: authBody) {
    const tokens = await AuthAPI.auth(data);
    storageUtil.setTokens(tokens.accessToken, tokens.refreshToken);
  }

  static async loginTelegram(): Promise<boolean> {
    return await TelegramService.login();
  }

  static async register(data) {
    const telegramInfo = storageUtil.getTelegramInfo();
    await AuthAPI.register({
      ...data,
      telegram: telegramInfo,
    });
  }

  static async redirectToRegisterBot(router: NextRouter) {
    const botUrl = `https://t.me/${config.contacts.bot}`;
    if (router.isReady) {
      await router.push(botUrl);
    }
  }

  static async registerTelegram() {
    await TelegramService.register();
  }
}

export default AuthService;
