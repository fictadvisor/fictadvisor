import React from 'react';
import { useQuery } from 'react-query';
import { ChevronLeftIcon, FingerPrintIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button-mui';
import Loader, { LoaderSize } from '@/components/common/ui/loader';
import CreatePasswordForm from '@/components/pages/password-recovery/create-password-page/components/create-password-form';
import * as styles from '@/components/pages/password-recovery/create-password-page/CreatePasswordPage.styles';
import { AuthAPI } from '@/lib/api/auth/AuthAPI';

import PageLayout from '../../../common/layout/page-layout/PageLayout';

const CreatePasswordPage = () => {
  const router = useRouter();

  const token = router.query.token as string;
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
    <PageLayout
      hasHeader={false}
      hasFooter={false}
      description={'Сторінка для створення нового пароля'}
    >
      <Box sx={styles.container}>
        <Box sx={styles.content}>
          {isFetching || !data.isAvailable ? (
            <Loader size={LoaderSize.SMALLEST} />
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
                variant="text"
                size="small"
                startIcon={<ChevronLeftIcon />}
                onClick={returnAuth}
              />
            </>
          )}
        </Box>
      </Box>
    </PageLayout>
  );
};

export default CreatePasswordPage;
