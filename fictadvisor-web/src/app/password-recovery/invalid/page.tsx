'use client';

import React from 'react';
import { ChevronLeftIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import * as styles from '@/app/password-recovery/invalid/PasswordResetLinkExpiredPage.styles';
import PageLayout from '@/components/common/layout/page-layout';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';

const PasswordResetLinkExpired = () => {
  const router = useRouter();
  const returnRegister = () => {
    void router.push('/register');
  };

  const handleSubmit = () => {
    void router.push('/password-recovery');
  };

  return (
    <PageLayout hasHeader={false} hasFooter={false} robots="noindex">
      <Box sx={styles.container}>
        <Box sx={styles.content}>
          <Box sx={styles.icon}>
            <ClockIcon />
          </Box>
          <Typography sx={styles.title}>Посилання більше не активне</Typography>
          <Typography sx={styles.description}>
            Час зміни пароля вичерпано. Для повторної відправки листа, натисни
            на кнопку.
          </Typography>
          <Button
            text="Надіслати лист"
            variant={ButtonVariant.FILLED}
            size={ButtonSize.LARGE}
            color={ButtonColor.PRIMARY}
            onClick={handleSubmit}
            sx={styles.button}
          />
          <Button
            text="Повернутись до введення даних"
            variant={ButtonVariant.TEXT}
            size={ButtonSize.SMALL}
            startIcon={<ChevronLeftIcon />}
            onClick={returnRegister}
            sx={styles.buttonBack}
          />
        </Box>
      </Box>
    </PageLayout>
  );
};

export default PasswordResetLinkExpired;
