'use client';

import React, { FC } from 'react';
import { PaginatedGroupsResponse } from '@fictadvisor/utils/responses';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import RegisterForm from '@/app/(auth)/register/components/register-form';
import CustomTelegram from '@/components/common/icons/CustomTelegram';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import AuthService from '@/lib/services/auth/AuthService';
import StorageUtil from '@/lib/utils/StorageUtil';

import * as stylesMUI from './LeftBlock.styles';

import styles from './Link.module.scss';

const LeftBlock: FC<Omit<PaginatedGroupsResponse, 'pagination'>> = ({
  groups,
}) => {
  const router = useRouter();
  const hasTelegram = !!StorageUtil.getTelegramInfo();
  const handleClick = async () => {
    await AuthService.redirectToRegisterBot(router);
  };

  return (
    <Box sx={stylesMUI.leftBlock}>
      <Link href="/" className={styles['mobile-register-logo-container']}>
        <Image
          src="/images/login-page/new-logo.png"
          alt="fice advisor logo"
          fill
        />
      </Link>
      <Typography variant="h3" sx={stylesMUI.loginHeader}>
        Створи акаунт
      </Typography>
      {hasTelegram ? (
        <Typography variant="h6" sx={stylesMUI.telegramConnected}>
          Telegram приєднано, дозаповни усі поля
        </Typography>
      ) : (
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
      )}
      <RegisterForm groups={groups || []} />
      <Typography sx={stylesMUI.mobileText}>Вже маєш аккаунт?</Typography>
      <Button
        text="Увійти!"
        size={ButtonSize.SMALL}
        color={ButtonColor.SECONDARY}
        variant={ButtonVariant.OUTLINE}
        sx={stylesMUI.loginMobileButton}
        onClick={() => {
          void router.push('/login');
        }}
      />
    </Box>
  );
};

export default LeftBlock;
