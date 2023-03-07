import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout';
import Button from '@/components/common/ui/button';
import useAuthentication from '@/hooks/use-authentication';
import { AuthAPI } from '@/lib/api/auth/AuthAPI';
import { UserAPI } from '@/lib/api/user/UserAPI';
import AuthService from '@/lib/services/auth';
import StorageUtil from '@/lib/utils/StorageUtil';

const OAuthPage = () => {
  //TODO ЗРОБИ ПЛЗ
  const router = useRouter();
  const { token } = router.query;
  const { user, isLoggedIn } = useAuthentication();

  const loadData = useCallback(
    async token => {
      if (router.isReady) {
        const { isRegistered } = await AuthAPI.checkRegisterTelegram(
          token as string,
        );
        if (isRegistered) {
          await AuthService.registerTelegram();

          if (isLoggedIn) {
            await UserAPI.linkTelegram(user.id, StorageUtil.getTelegramInfo());
            await router.push('account');
          } else await router.push('/register?telegram=true');
        } else {
          if (isLoggedIn) await router.push('/account');
          else await router.push('/register?telegram=false');
        }
      }
    },
    [isLoggedIn, router, user],
  );

  useEffect(() => {
    void loadData(token);
  }, [loadData, token]);

  const handleClick = async () => {
    await AuthService.registerTelegram();
  };

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
        <Button text="LOL" onClick={handleClick} />
        {/*<Loader size={LoaderSize.SMALLEST} />*/}
      </div>
    </PageLayout>
  );
};

export default OAuthPage;
