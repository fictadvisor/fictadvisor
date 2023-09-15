import { useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

import Progress from '@/components/common/ui/progress';
import * as styles from '@/components/pages/register/verify-email-token-page/VerifyEmailTokenPage.styles';
import useAuthentication from '@/hooks/use-authentication';
import useToast from '@/hooks/use-toast';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import StorageUtil from '@/lib/utils/StorageUtil';

const VerifyEmailTokenPage = () => {
  const router = useRouter();
  const token = router.query.token as string;
  const toast = useToast();
  const { update } = useAuthentication();

  const loadData = useCallback(
    async (token: string) => {
      if (router.isReady) {
        try {
          const { accessToken, refreshToken } = await AuthAPI.verifyEmailToken(
            token,
          );
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
