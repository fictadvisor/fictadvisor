import React, { FC } from 'react';
import { Box, Divider } from '@mui/material';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const LoginFormBlock = dynamic(() => import('./components/login-form-block'), {
  ssr: false,
});

import * as styles from '@/app/(auth)/login/LoginPage.styles';
import loginMetadata from '@/lib/metadata/login';

import LogoRegisterBlock from './components/logo-register-block';
export const metadata: Metadata = loginMetadata;
const Login: FC = () => {
  return (
    <>
      <Box sx={styles.loginPage}>
        <Image
          quality={100}
          src="/images/login-page/login-background.png"
          fill
          priority
          alt="дуже гарна картинка"
        />
        <Box sx={styles.loginPageContent}>
          <LogoRegisterBlock />
          <Divider orientation="vertical" sx={styles.divider} />
          <LoginFormBlock />
        </Box>
      </Box>
    </>
  );
};

export default Login;
