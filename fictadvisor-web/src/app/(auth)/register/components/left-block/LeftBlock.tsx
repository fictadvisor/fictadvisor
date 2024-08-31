import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { RegisterForm } from '@/app/(auth)/register/components/register-form/RegisterForm';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';

import { TelegramRegisterButtons } from '../telegram-register-buttons/TelegramRegisterButtons';

import * as stylesMUI from './LeftBlock.styles';

import styles from './Link.module.scss';

export const LeftBlock: FC = () => {
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

      <TelegramRegisterButtons />

      <RegisterForm />

      <Typography sx={stylesMUI.mobileText}>Вже маєш аккаунт?</Typography>

      <Button
        text="Увійти!"
        size={ButtonSize.SMALL}
        color={ButtonColor.SECONDARY}
        variant={ButtonVariant.OUTLINE}
        sx={stylesMUI.loginMobileButton}
        href="/login"
      />
    </Box>
  );
};
