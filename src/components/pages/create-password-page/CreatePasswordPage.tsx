import React from 'react';
import { ChevronLeftIcon, FingerPrintIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import CreatePasswordForm from '@/components/pages/create-password-page/components/create-password-form';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import styles from './CreatePasswordPage.module.scss';

const CreatePasswordPage = () => {
  const router = useRouter();
  const returnAuth = () => {
    router.push('/login');
  };
  return (
    <PageLayout
      hasHeader={false}
      hasFooter={false}
      description={'Сторінка для створення нового пароля'}
    >
      <div className={styles['create-password-page']}>
        <div className={styles['create-password-page-content']}>
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
        </div>
      </div>
    </PageLayout>
  );
};

export default CreatePasswordPage;
