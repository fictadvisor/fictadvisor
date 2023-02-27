import { STORAGE_KEYS } from '@/lib/types/common';

class StorageUtil {
  static setTokens(accessToken: string, refreshToken: string) {
    if (!process.browser) {
      return;
    }

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  static getTokens() {
    if (!process.browser) {
      return null;
    }

    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    return accessToken && refreshToken ? { accessToken, refreshToken } : null;
  }

  static getAccessToken = () => StorageUtil.getTokens()?.accessToken;

  static deleteTokens() {
    if (!process.browser) {
      return;
    }

    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  static setTelegramInfo(data) {
    if (!process.browser) {
      return;
    }
    sessionStorage.setItem(STORAGE_KEYS.TELEGRAM_INFO, JSON.stringify(data));
  }

  static getTelegramInfo() {
    if (!process.browser) {
      return;
    }
    const data = sessionStorage.getItem(STORAGE_KEYS.TELEGRAM_INFO);
    return JSON.parse(data);
  }
}

export default StorageUtil;
