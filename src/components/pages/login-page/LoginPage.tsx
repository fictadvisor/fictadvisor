import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button';
import Divider, { DividerTextPosition } from '@/components/common/ui/divider';
import LoginForm from '@/components/pages/login-page/components/login-form';
import LoginTelegramButton from '@/components/pages/login-page/components/login-telegram-button';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const { push } = useRouter();

  return (
    <PageLayout
      description={'Сторінка для авторизації'}
      hasFooter={false}
      hasHeader={false}
    >
      <div className={styles['login-page']}>
        <div className={styles['login-page__content']}>
          <h3 className={styles['register-header']}>З поверненням!</h3>
          <Divider text="або" textPosition={DividerTextPosition.CENTER} />
          <LoginTelegramButton />
          <LoginForm />
          <Button
            text={'Зареструватися'}
            onClick={() => {
              void push('/register');
            }}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
