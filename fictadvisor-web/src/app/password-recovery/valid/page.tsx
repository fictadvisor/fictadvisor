'use client';

import React from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import * as styles from '@/app/password-recovery/valid/PasswordResetValidLinkPage.styles';
import PageLayout from '@/components/common/layout/page-layout';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';

const PasswordResetValidLink = () => {
  const router = useRouter();
  const returnAuth = () => {
    void router.push('/login');
  };

  return (
    <PageLayout hasHeader={false} hasFooter={false} robots="noindex">
      <Box sx={styles.container}>
        <Box sx={styles.content}>
          <Box sx={styles.icon}>
            <ShieldCheckIcon />
          </Box>
          <Typography sx={styles.title}>Пароль змінено</Typography>
          <Typography sx={styles.description}>
            Твій пароль успішно змінено! Натисни нижче, щоб повернутися до поля
            авторизації.
          </Typography>
          <Button
            text="Повернутися до авторизації"
            variant={ButtonVariant.FILLED}
            size={ButtonSize.LARGE}
            color={ButtonColor.PRIMARY}
            onClick={returnAuth}
            sx={styles.button}
          />
        </Box>
      </Box>
    </PageLayout>
  );
};

export default PasswordResetValidLink;
