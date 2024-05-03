'use client';
import { useCallback, useEffect } from 'react';
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
  const { update } = useAuthentication();

  const token = pathName.split('/').pop() ?? '';

  const loadData = useCallback(
    async (token: string) => {
      try {
        const { accessToken, refreshToken } =
          await AuthAPI.verifyEmailToken(token);
        StorageUtil.setTokens(accessToken, refreshToken);
        update();
        await router.push(`/`);
      } catch (e) {
        toast.error(
          'Лист реєстрації вже не дійсний',
          'Пройди реєстрацію знов!',
        );
        await router.push(`/register`);
      }
    },
    [toast, router, update],
  );

  useEffect(() => {
    void loadData(token);
  }, [loadData, token]);

  return (
    <Box sx={styles.box}>
      <Progress />
    </Box>
  );
};

export default VerifyEmailTokenPage;
