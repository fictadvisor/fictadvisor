import { NextRouter } from 'next/router';
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

type UpdateFunction = ReturnType<typeof useAuthentication>['update'];

const tryTelegramLogin = async (update: UpdateFunction) => {
  try {
    const data = await openAuthenticationDialog();
    const token = await api.oauth.exchange(data);

    oauth.saveToken(token.access_token, token.refresh_token);
    update();

    return true;
  } catch (e) {
    return false;
  }
};

export const loginTelegram = async (router: NextRouter, loginUrl: string, update: UpdateFunction) => {
  const logged = await tryTelegramLogin(update);

  if (!logged && router != null && router.isReady) {
    router.push(loginUrl);
  }
};
