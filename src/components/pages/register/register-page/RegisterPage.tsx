import PageLayout from '../../../common/layout/page-layout/PageLayout';

import LeftBlock from './components/left-block';
import RightBlock from './components/right-block';

import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  return (
    <PageLayout
      description={'Сторінка для авторизації'}
      hasFooter={false}
      hasHeader={false}
    >
      <div className={styles['register-page']}>
        <div className={styles['register-page__content']}>
          <LeftBlock />
          <hr className={styles['divider']} />
          <RightBlock />
        </div>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
