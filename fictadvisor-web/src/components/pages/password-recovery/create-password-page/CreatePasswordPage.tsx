import React from 'react';
import { useQuery } from 'react-query';
import { ChevronLeftIcon, FingerPrintIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Progress from '@/components/common/ui/progress';
import CreatePasswordForm from '@/components/pages/password-recovery/create-password-page/components/create-password-form';
import * as styles from '@/components/pages/password-recovery/create-password-page/CreatePasswordPage.styles';
import AuthAPI from '@/lib/api/auth/AuthAPI';

const CreatePasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const token = searchParams.get('token') as string;
  const returnAuth = () => {
    void router.push('/login');
  };

  const { data, isFetching } = useQuery(
    'createPassword',
    () => AuthAPI.checkResetToken(token),
    {
      refetchOnWindowFocus: false,
    },
  );
  if (!isFetching) {
    if (!data.isAvailable) {
      void router.push('/password-recovery/invalid');
    }
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        {isFetching || !data.isAvailable ? (
          <Progress />
        ) : (
          <>
            <Box sx={styles.icon}>
              <FingerPrintIcon />
            </Box>
            <Typography sx={styles.title}>Вигадай новий пароль</Typography>
            <Box sx={styles.form}>
              <CreatePasswordForm />
            </Box>
            <Button
              text="Повернутись до авторизації"
              variant={ButtonVariant.TEXT}
              size={ButtonSize.SMALL}
              startIcon={<ChevronLeftIcon />}
              onClick={returnAuth}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default CreatePasswordPage;
