import config from '../config';
import api from './api';
import { useAuthentication } from './context/AuthenticationContext';
import oauth from './oauth';

const openAuthenticationDialog = () => new Promise<any>((resolve, reject) => {
  try {
    const Telegram = (window as any).Telegram;
    Telegram.Login.auth(
      { bot_id: config.botId, request_access: true },
      (data) => {
        return data ? resolve(data) : reject(new Error('Failed to authenticate'));
      }
    )
  } catch (e) {
    reject(e);
  }
});

export const tryTelegramLogin = async (authentication: ReturnType<typeof useAuthentication>) => {
  try {
    const data = await openAuthenticationDialog();
    const token = await api.oauth.exchange(data);

    oauth.saveToken(token.access_token, token.refresh_token);
    authentication.update();

    return true;
  } catch (e) {
    return false;
  }
};