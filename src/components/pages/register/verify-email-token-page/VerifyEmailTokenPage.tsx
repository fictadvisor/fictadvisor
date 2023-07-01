import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { AlertColor } from '@/components/common/ui/alert';
import Loader, { LoaderSize } from '@/components/common/ui/loader';
import useAuthentication from '@/hooks/use-authentication';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import StorageUtil from '@/lib/utils/StorageUtil';
import { showAlert } from '@/redux/reducers/alert.reducer';

const VerifyEmailTokenPage = () => {
  const router = useRouter();
  const token = router.query.token as string;
  const dispatch = useDispatch();
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
          dispatch(
            showAlert({
              title: 'Лист реєстрації вже не дійсний',
              description: 'Пройди реєстрацію знов!',
              color: AlertColor.ERROR,
            }),
          );
          await router.push(`/register`);
        }
      }
    },
    [dispatch, router, update],
  );

  useEffect(() => {
    void loadData(token);
  }, [loadData, token]);

  return (
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
  );
};

export default VerifyEmailTokenPage;
