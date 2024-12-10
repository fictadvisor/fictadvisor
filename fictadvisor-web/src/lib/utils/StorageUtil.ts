import { STORAGE_KEYS } from '@/types/storage';
import { TelegramUser } from '@/types/telegram';

class StorageUtil {
  setTelegramInfo(data: { telegram: TelegramUser }) {
    if (!process.browser) {
      return;
    }
    sessionStorage.setItem(STORAGE_KEYS.TELEGRAM_INFO, JSON.stringify(data));
  }

  deleteTelegramInfo() {
    if (!process.browser) {
      return;
    }
    sessionStorage.removeItem(STORAGE_KEYS.TELEGRAM_INFO);
  }

  getTelegramInfo() {
    if (!process.browser) {
      return;
    }
    const data = sessionStorage.getItem(STORAGE_KEYS.TELEGRAM_INFO);
    return data ? JSON.parse(data) : null;
  }
}

export default new StorageUtil();
