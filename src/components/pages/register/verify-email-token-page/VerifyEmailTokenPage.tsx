import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout';
import Loader, { LoaderSize } from '@/components/common/ui/loader';
import { AuthAPI } from '@/lib/api/auth/AuthAPI';
import StorageUtil from '@/lib/utils/StorageUtil';

const VerifyEmailTokenPage = () => {
  const router = useRouter();
  const token = router.query.token as string;

  const loadData = useCallback(
    async token => {
      if (router.isReady) {
        try {
          const { accessToken, refreshToken } = await AuthAPI.verifyEmailToken(
            token,
          );
          StorageUtil.setTokens(accessToken, refreshToken);
          // await router.push(`/`);
        } catch (e) {
          // await router.push(`/register?error=${e.response.data.error}`);
        }
      }
    },
    [router],
  );

  useEffect(() => {
    void loadData(token);
  }, [loadData, token]);

  return (
    <PageLayout hasHeader={true} hasFooter={true}>
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

export default VerifyEmailTokenPage;
