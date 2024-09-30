'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import CustomTelegram from '@/components/common/icons/CustomTelegram';
import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import TelegramService from '@/lib/services/telegram/TelegramService';

import * as sxStyles from './TelegramLogin.styles';

export const TelegramLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect');

  const handleTelegramLogin = async () => {
    const isSuccess = await TelegramService.login();
    if (isSuccess) {
      router.push(redirect ? redirect.replace('~', '/') : '/');
    } else {
      await TelegramService.redirectToRegisterBot();
    }
  };

  return (
    <Button
      startIcon={<CustomTelegram />}
      text="Увійти за допомогою Telegram"
      size={ButtonSize.LARGE}
      type="button"
      onClick={handleTelegramLogin}
      sx={sxStyles.telegramButton}
    />
  );
};
