import { useQuery } from 'react-query';

import { GroupAPI } from '@/lib/api/group/GroupAPI';

import PageLayout from '../../../common/layout/page-layout/PageLayout';

import LeftBlock from './components/left-block';
import RightBlock from './components/right-block';

import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  const { isLoading, data } = useQuery(['groups'], GroupAPI.getAll, {
    refetchOnWindowFocus: false,
  });

  return (
    <PageLayout
      description={'Сторінка для авторизації'}
      hasFooter={false}
      hasHeader={false}
    >
      <div className={styles['register-page']}>
        <div className={styles['register-page__content']}>
          {!isLoading && (
            <>
              <LeftBlock groups={data.groups || []} />
              <hr className={styles['divider']} />
              <RightBlock />
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
