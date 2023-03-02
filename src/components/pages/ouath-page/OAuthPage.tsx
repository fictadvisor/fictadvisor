import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout';
import Loader, { LoaderSize } from '@/components/common/ui/loader';
import { AuthAPI } from '@/lib/api/auth/AuthAPI';
import AuthService from '@/lib/services/auth';

const OAuthPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const loadData = useCallback(
    async token => {
      if (router.isReady) {
        const { isRegistered } = await AuthAPI.checkRegisterTelegram(
          token as string,
        );
        if (isRegistered) {
          await AuthService.registerTelegram();
          await router.push('/register?telegram=true');
        } else {
          await router.push('/register?telegram=false');
        }
      }
    },
    [router],
  );

  useEffect(() => {
    void loadData(token);
  }, [loadData, token]);

  return (
    <PageLayout hasHeader={true} hasFooter={false}>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader size={LoaderSize.SMALLEST} />
      </div>
    </PageLayout>
  );
};

export default OAuthPage;
