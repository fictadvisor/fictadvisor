import React from 'react';
import { Box, Divider } from '@mui/material';
import Image from 'next/image';
import LoginFormBlock from 'src/components/pages/login-page/components/login-form-block';
import LogoRegisterBlock from 'src/components/pages/login-page/components/logo-register-block';

import * as styles from './LoginPage.styles';

const LoginPage = () => {
  return (
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
  );
};

export default LoginPage;
