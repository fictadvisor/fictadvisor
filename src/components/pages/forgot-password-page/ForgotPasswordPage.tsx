import React from 'react';
import { ChevronLeftIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import ForgotPasswordForm from '@/components/pages/forgot-password-page/components/forgot-password-form';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import styles from './ForgotPasswordPage.module.scss';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const returnAuth = () => {
    router.push('/login');
  };
  return (
    <PageLayout
      hasHeader={false}
      hasFooter={false}
      description={'Сторінка для створення нового паролю'}
    >
      <div className={styles['forgot-password-page']}>
        <div className={styles['forgot-password-page-content']}>
          <div className={styles['icon']}>
            <EnvelopeIcon />
          </div>
          <div className={styles['headline']}>
            <h3>Забув пароль?</h3>
          </div>
          <div className={styles['text']}>
            <h6>Ми надішлемо на введену пошту лист для зміни паролю</h6>
          </div>
          <div className={styles['formik']}>
            <ForgotPasswordForm />
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

export default ForgotPasswordPage;
