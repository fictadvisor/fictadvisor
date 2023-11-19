import React, { FC } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
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
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import getErrorMessage from '@/lib/utils/getErrorMessage';

import * as styles from './EmailConfirmationPage.module';

type EmailConfirmationPageProps = {
  apiMethodName: 'forgotPassword' | 'verifyEmail';
};

const EmailConfirmationPage: FC<EmailConfirmationPageProps> = ({
  apiMethodName,
}) => {
  const { displayError } = useToastError();
  const router = useRouter();
  const email = decodeURIComponent(String(router.query.email)).toLowerCase();
  const emailText =
    apiMethodName === 'forgotPassword'
      ? `Ми надіслали лист для зміни пароля на адресу ${email}`
      : `Ми надіслали лист для підтвердження на адресу ${email}`;
  const returnRegister = () => {
    void router.push(
      apiMethodName === 'forgotPassword' ? '/login' : '/register',
    );
  };

  const toast = useToast();
  const handleSendAgain = async () => {
    try {
      await AuthAPI[apiMethodName]({ email });
    } catch (error) {
      const message = getErrorMessage(error);
      message
        ? toast.error(message)
        : toast.error('Щось пішло не так, спробуй пізніше!');
      // const errorName =
      //   (error as AxiosError<{ error: string }>).response?.data.error || '';
      // toast.error(chooseMessageError(errorName, tries));
      displayError(error);
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Box sx={styles.icon}>
          <CustomEnvelopeOpen />
        </Box>
        <Typography sx={styles.title}>Перевір свою пошту</Typography>
        <Typography sx={styles.description}>{emailText}</Typography>
        <Box sx={styles.info}>
          <Typography sx={styles.question}>Не отримав лист?</Typography>
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
          title={
            apiMethodName === 'forgotPassword'
              ? 'Лист для зміни пароля діє 1 годину'
              : 'Лист реєстрації діє 1 годину'
          }
          type={AlertType.INFO}
          variant={AlertVariant.DARKER}
        />
        <Button
          text={
            apiMethodName === 'forgotPassword'
              ? 'Повернутись до авторизації'
              : 'Повернутись до введення даних'
          }
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

export default EmailConfirmationPage;
