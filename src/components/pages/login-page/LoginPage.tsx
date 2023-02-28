import LoginForm from '@/components/pages/login-page/components/login-form';
import LoginTelegramButton from '@/components/pages/login-page/components/login-telegram-button';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <PageLayout description={'Сторінка для авторизації'}>
      <div className={styles['login-page']}>
        <div className={styles['login-page__content']}>
          <h3 className={styles['register-header']}>З поверненням!</h3>
          <LoginTelegramButton />
          <LoginForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
