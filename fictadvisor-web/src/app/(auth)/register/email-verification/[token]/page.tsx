'use client';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

import * as styles from '@/app/(auth)/register/email-verification/[token]/VerifyEmailTokenPage.styles';
import Progress from '@/components/common/ui/progress';
import useAuthentication from '@/hooks/use-authentication';
import useToast from '@/hooks/use-toast';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import StorageUtil from '@/lib/utils/StorageUtil';

const VerifyEmailTokenPage = () => {
  const router = useRouter();
  const pathName = usePathname();

  const toast = useToast();
  const { update, isLoggedIn } = useAuthentication();

  const token = pathName.split('/').pop() ?? '';

  const loadData = async (token: string): Promise<void> => {
    console.log('isLoggedIn:', isLoggedIn);
    if (isLoggedIn) return;

    try {
      const { accessToken, refreshToken } =
        await AuthAPI.verifyEmailToken(token);
      StorageUtil.setTokens(accessToken, refreshToken);
      await update();
      router.push(`/`);
    } catch (e) {
      toast.error('Лист реєстрації вже не дійсний', 'Пройди реєстрацію знов!');
      router.push(`/register`);
    }
  };

  useEffect(() => {
    void loadData(token);
  }, []);

  return (
    <Box sx={styles.box}>
      <Progress />
    </Box>
  );
};

export default VerifyEmailTokenPage;
