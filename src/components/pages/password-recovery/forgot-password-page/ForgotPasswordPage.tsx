import React from 'react';
import { ChevronLeftIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import ForgotPasswordForm from '@/components/pages/password-recovery/forgot-password-page/components/forgot-password-form';
import * as styles from '@/components/pages/password-recovery/forgot-password-page/ForgotPasswordPage.styles';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const returnAuth = () => {
    void router.push('/login');
  };
  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Box sx={styles.icon}>
          <EnvelopeIcon />
        </Box>
        <Typography sx={styles.title}>Забув пароль?</Typography>
        <Typography sx={styles.text}>
          Ми надішлемо на введену пошту лист для зміни паролю
        </Typography>
        <Box sx={styles.form}>
          <ForgotPasswordForm />
        </Box>
        <Button
          text="Повернутись до авторизації"
          variant={ButtonVariant.TEXT}
          size={ButtonSize.SMALL}
          startIcon={<ChevronLeftIcon />}
          onClick={returnAuth}
        />
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
