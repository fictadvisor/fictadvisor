import LeftBlock from '@/components/pages/login-page/components/left-block';
import RightBlock from '@/components/pages/login-page/components/right-block';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <PageLayout
      description={'Сторінка для авторизації'}
      hasFooter={false}
      hasHeader={false}
    >
      <div className={styles['login-page']}>
        <div className={styles['login-page__content']}>
          <LeftBlock />
          <hr />
          <RightBlock />
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
