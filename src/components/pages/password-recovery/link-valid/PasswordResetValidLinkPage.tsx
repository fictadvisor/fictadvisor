import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { CustomShield } from '@/components/common/icons/CustomShield';
import PageLayout from '@/components/common/layout/page-layout';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import * as styles from '@/components/pages/password-recovery/link-valid/PasswordResetValidLinkPage.styles';

const PasswordResetValidLinkPage = () => {
  const router = useRouter();
  const returnAuth = () => {
    void router.push('/login');
  };
  return (
    <PageLayout
      hasHeader={false}
      hasFooter={false}
      description={'Пароль успішно змінено'}
    >
      <Box sx={styles.container}>
        <Box sx={styles.content}>
          <Box sx={styles.icon}>
            <CustomShield />
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

export default PasswordResetValidLinkPage;
