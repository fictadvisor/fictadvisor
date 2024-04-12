import React, { FC } from 'react';
import { Box, Divider } from '@mui/material';
import { Metadata } from 'next';
import Image from 'next/image';

import LoginFormBlock from '@/app/login/components/login-form-block';
import LogoRegisterBlock from '@/app/login/components/logo-register-block';
import * as styles from '@/app/login/LoginPage.styles';
import PageLayout from '@/components/common/layout/page-layout';
import loginMetadata from '@/lib/metadata/login';
export const metadata: Metadata = loginMetadata;
const Login: FC = () => {
  return (
    <PageLayout hasHeader={false} hasFooter={false}>
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
    </PageLayout>
  );
};

export default Login;
