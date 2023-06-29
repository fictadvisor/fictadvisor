import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { CustomClock } from '@/components/common/icons/CustomClock';
import PageLayout from '@/components/common/layout/page-layout';
import Button from '@/components/common/ui/button-mui';
import * as styles from '@/components/pages/password-recovery/link-expired/PasswordResetLinkExpiredPage.styles';

const PasswordResetLinkExpiredPage = () => {
  const router = useRouter();
  const returnRegister = () => {
    router.push('/register');
  };

  const handleSubmit = () => {
    void router.push('/password-recovery');
  };

  return (
    <PageLayout
      hasHeader={false}
      hasFooter={false}
      description={'Час зміни пароля вичерпано'}
    >
      <Box sx={styles.container}>
        <Box sx={styles.content}>
          <Box sx={styles.icon}>
            <CustomClock />
          </Box>
          <Typography sx={styles.title}>Посилання більше не активне</Typography>
          <Typography sx={styles.description}>
            Час зміни пароля вичерпано. Для повторної відправки листа, натисни
            на кнопку.
          </Typography>
          <Button
            text="Надіслати лист"
            variant="filled"
            size="large"
            color="primary"
            onClick={handleSubmit}
            sx={styles.button}
          />
          <Button
            text="Повернутись до введення даних"
            variant="text"
            size="small"
            startIcon={<ChevronLeftIcon />}
            onClick={returnRegister}
            sx={styles.buttonBack}
          />
        </Box>
      </Box>
    </PageLayout>
  );
};

export default PasswordResetLinkExpiredPage;
