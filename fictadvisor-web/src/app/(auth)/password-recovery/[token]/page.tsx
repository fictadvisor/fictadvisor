'use client';

import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { ChevronLeftIcon, FingerPrintIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import CreatePasswordForm from '@/app/(auth)/password-recovery/[token]/components/create-password-form';
import * as styles from '@/app/(auth)/password-recovery/[token]/CreatePasswordPage.styles';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Progress from '@/components/common/ui/progress';
import AuthAPI from '@/lib/api/auth/AuthAPI';

interface TokenParams {
  params: {
    token: string;
  };
}

const CreatePassword: FC<TokenParams> = ({ params }) => {
  const token = params.token;
  const router = useRouter();
  const returnAuth = () => {
    void router.push('/login');
  };

  const { data, isFetching } = useQuery({
    queryKey: 'createPassword',
    queryFn: () => AuthAPI.checkResetToken(token)
  }, {
    refetchOnWindowFocus: false,
  });
  if (!isFetching) {
    if (!data?.isAvailable) {
      void router.push('/password-recovery/invalid');
    }
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        {isFetching || !data?.isAvailable ? (
          <Progress />
        ) : (
          <>
            <Box sx={styles.icon}>
              <FingerPrintIcon />
            </Box>
            <Typography sx={styles.title}>Вигадай новий пароль</Typography>
            <Box sx={styles.form}>
              <CreatePasswordForm token={token} />
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

export default CreatePassword;
