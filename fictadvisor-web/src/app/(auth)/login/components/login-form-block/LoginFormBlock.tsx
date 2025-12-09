'use client';

import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { LoginFormBlockFooter } from './components/footer/LoginFormBlockFooter';
import * as sxStyles from './LoginFormBlock.styles';

import styles from './LoginFormBlock.module.scss';

const TelegramLogin = dynamic(
  () =>
    import('./components/telegram-login/TelegramLogin').then(
      module => module.TelegramLogin,
    ),
  { ssr: false },
);
const LoginForm = dynamic(
  () =>
    import('@/app/(auth)/login/components/login-form-block/components/login-form/LoginForm').then(
      module => module.LoginForm,
    ),
  { ssr: false },
);

export const LoginFormBlock = () => {
  return (
    <Box sx={sxStyles.loginFormBlock}>
      <Link href="/" className={styles['mobile-login-logo']}>
        <Image src="/icons/logo.svg" alt="fice advisor logo" priority fill />
      </Link>

      <Typography variant="h3SemiBold" sx={sxStyles.loginHeader}>
        З поверненням!
      </Typography>

      <TelegramLogin />

      <Divider textAlign="center" sx={sxStyles.divider}>
        або
      </Divider>

      <LoginForm />

      <LoginFormBlockFooter />
    </Box>
  );
};
