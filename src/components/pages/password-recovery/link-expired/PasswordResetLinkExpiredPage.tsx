import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { CustomClock } from '@/components/common/icons/CustomClock';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import * as styles from '@/components/pages/password-recovery/link-expired/PasswordResetLinkExpiredPage.styles';

const PasswordResetLinkExpiredPage = () => {
  const router = useRouter();
  const returnRegister = () => {
    void router.push('/register');
  };

  const handleSubmit = () => {
    void router.push('/password-recovery');
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Box sx={styles.icon}>
          <CustomClock />
        </Box>
        <Typography sx={styles.title}>Посилання більше не активне</Typography>
        <Typography sx={styles.description}>
          Час зміни пароля вичерпано. Для повторної відправки листа, натисни на
          кнопку.
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
  );
};

export default PasswordResetLinkExpiredPage;
