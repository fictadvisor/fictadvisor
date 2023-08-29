import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { CustomEnvelopeOpen } from '@/components/common/icons/CustomEnvelopeOpen';
import Alert from '@/components/common/ui/alert';
import { AlertType, AlertVariant } from '@/components/common/ui/alert/types';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import * as styles from '@/components/pages/password-recovery/email-confirmation-page/PasswordResetEmailConfirmationPage.module';
import chooseMessageError from '@/components/pages/password-recovery/email-confirmation-page/utils/chooseMessageError';
import useToast from '@/hooks/use-toast';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import getErrorMessage from '@/lib/utils/getErrorMessage';

const PasswordResetEmailConfirmationPage = () => {
  const router = useRouter();
  const email = (router.query.email as string).toLowerCase();
  const emailText = email
    ? 'Ми надіслали листа для зміни пароля на адресу '
    : 'Ми надіслали листа для зміни пароля';
  const returnRegister = () => {
    void router.push('/register');
  };

  const tries = 0;
  const toast = useToast();
  const handleSendAgain = async () => {
    try {
      await AuthAPI.forgotPassword({ email });
    } catch (error) {
      const message = getErrorMessage(error);
      message
        ? toast.error(message)
        : toast.error('Щось пішло не так, спробуй пізніше!');
      // const errorName =
      //   (error as AxiosError<{ error: string }>).response?.data.error || '';
      // toast.error(chooseMessageError(errorName, tries));
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Box sx={styles.icon}>
          <CustomEnvelopeOpen />
        </Box>
        <Typography sx={styles.title}>Перевір свою пошту</Typography>
        <Typography sx={styles.description}>
          {emailText}
          <Box component="span" sx={styles.email}>
            {email}
          </Box>
        </Typography>
        <Box sx={styles.flex}>
          <Typography sx={styles.question}>Не отримав листа?</Typography>
          <Button
            text="Надіслати повторно"
            variant={ButtonVariant.TEXT}
            size={ButtonSize.SMALL}
            color={ButtonColor.PRIMARY}
            onClick={handleSendAgain}
            sx={styles.button}
          />
        </Box>
        <Alert
          title="Лист реєстрації діє 1 годину"
          type={AlertType.INFO}
          variant={AlertVariant.DARKER}
        />
        <Button
          text="Повернутись до авторизації"
          variant={ButtonVariant.TEXT}
          size={ButtonSize.SMALL}
          startIcon={<ChevronLeftIcon />}
          onClick={returnRegister}
          sx={styles.arrow}
        />
      </Box>
    </Box>
  );
};

export default PasswordResetEmailConfirmationPage;
