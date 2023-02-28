import { useState } from 'react';

import Loader from '@/components/common/ui/loader/Loader';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import PollForm from './components/poll-form';

import styles from './PollPage.module.scss';

const LoginPage = () => {
  const [isFetching, setIsFetching] = useState(false);
  return (
    <PageLayout
      description={'Сторінка для авторизації'}
      hasFooter={true}
      hasHeader={true}
    >
      <div className={styles['poll-page']}>
        <div className={styles['poll-page__content']}>
          {isFetching ? <Loader /> : <PollForm />}
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
