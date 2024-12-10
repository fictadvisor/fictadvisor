'use client';

import React, { FC } from 'react';
import { Typography } from '@mui/material';

import CustomTelegram from '@/components/common/icons/CustomTelegram';
import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import TelegramService from '@/lib/services/telegram/TelegramService';
import StorageUtil from '@/lib/utils/StorageUtil';

import * as stylesMUI from './TelegramRegisterButtons.styles';

export const TelegramRegisterButtons: FC = () => {
  const hasTelegram = !!StorageUtil.getTelegramInfo();

  const handleClick = async () => {
    await TelegramService.redirectToRegisterBot();
  };

  if (hasTelegram) {
    return (
      <Typography variant="h6" sx={stylesMUI.telegramConnected}>
        Telegram приєднано, дозаповни усі поля
      </Typography>
    );
  }

  return (
    <>
      <Button
        startIcon={<CustomTelegram />}
        text="Приєднай Telegram"
        size={ButtonSize.SMALL}
        type="button"
        onClick={handleClick}
        sx={stylesMUI.mobileTelegramButton}
      />
      <Button
        startIcon={<CustomTelegram />}
        text="Приєднай Telegram"
        size={ButtonSize.LARGE}
        type="button"
        onClick={handleClick}
        sx={stylesMUI.telegramButton}
      />
      <Divider
        text="та введи дані нижче"
        textAlign={DividerTextAlign.CENTER}
        sx={stylesMUI.divider}
      />
    </>
  );
};
