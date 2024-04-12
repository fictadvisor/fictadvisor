'use client';

import React from 'react';
import { ChevronLeftIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import ForgotPasswordForm from '@/app/password-recovery/forgot-password/components/forgot-password-form';
import * as styles from '@/app/password-recovery/forgot-password/ForgotPasswordPage.styles';
import PageLayout from '@/components/common/layout/page-layout';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';

const ForgotPassword = () => {
  const router = useRouter();
  const returnAuth = () => {
    void router.push('/login');
  };

  return (
    <PageLayout hasHeader={false} hasFooter={false} robots="noindex">
      <Box sx={styles.container}>
        <Box sx={styles.content}>
          <Box sx={styles.icon}>
            <EnvelopeIcon />
          </Box>
          <Typography sx={styles.title}>Забув пароль?</Typography>
          <Typography sx={styles.text}>
            Ми надішлемо на введену пошту лист для зміни пароля
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
    </PageLayout>
  );
};

export default ForgotPassword;
