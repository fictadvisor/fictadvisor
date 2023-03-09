import React from 'react';
import { useQuery } from 'react-query';
import { ChevronLeftIcon, FingerPrintIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import Loader, { LoaderSize } from '@/components/common/ui/loader';
import CreatePasswordForm from '@/components/pages/password-recovery/create-password-page/components/create-password-form';
import { AuthAPI } from '@/lib/api/auth/AuthAPI';

import PageLayout from '../../../common/layout/page-layout/PageLayout';

import styles from './CreatePasswordPage.module.scss';

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
      <div className={styles['create-password-page']}>
        <div className={styles['create-password-page-content']}>
          {isFetching || !data.isAvailable ? (
            <Loader size={LoaderSize.SMALLEST} />
          ) : (
            <>
              <div className={styles['icon']}>
                <FingerPrintIcon />
              </div>
              <div className={styles['headline']}>
                <h3>Вигадай новий пароль</h3>
              </div>
              <div className={styles['formik']}>
                <CreatePasswordForm />
              </div>
              <Button
                text={'Повернутись до авторизації'}
                startIcon={<ChevronLeftIcon className="icon" />}
                variant={ButtonVariant.TEXT}
                size={ButtonSize.SMALL}
                onClick={returnAuth}
              />
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CreatePasswordPage;
