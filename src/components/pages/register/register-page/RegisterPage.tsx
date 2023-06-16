import type { FC } from 'react';

import type { GetAllDTO } from '@/lib/api/group/dto/GetAllDTO';

import PageLayout from '../../../common/layout/page-layout/PageLayout';

import LeftBlock from './components/left-block';
import RightBlock from './components/right-block';

import styles from './RegisterPage.module.scss';

export interface RegisterPageProps {
  data: GetAllDTO;
}

const RegisterPage: FC<RegisterPageProps> = ({ data }) => {
  return (
    <PageLayout
      description={'Сторінка для авторизації'}
      hasFooter={false}
      hasHeader={false}
    >
      <div className={styles['register-page']}>
        <div className={styles['register-page__content']}>
          <LeftBlock groups={data.groups || []} />
          <hr className={styles['divider']} />
          <RightBlock />
        </div>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
