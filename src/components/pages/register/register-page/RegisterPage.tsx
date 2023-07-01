import { FC } from 'react';
import Image from 'next/image';

import { GetAllResponse } from '@/lib/api/group/types/GetAllResponse';

import PageLayout from '../../../common/layout/page-layout/PageLayout';

import LeftBlock from './components/left-block';
import RightBlock from './components/right-block';

import styles from './RegisterPage.module.scss';

export interface RegisterPageProps {
  data: GetAllResponse | null;
}

const RegisterPage: FC<RegisterPageProps> = ({ data }) => {
  return (
    <PageLayout
      description={'Сторінка для авторизації'}
      hasFooter={false}
      hasHeader={false}
    >
      <div className={styles['register-page']}>
        <Image
          quality={100}
          className={styles['background-image']}
          src="/images/register-page/background.png"
          fill
          priority
          alt="дуже гарна картинка"
        />
        <div className={styles['register-page__content']}>
          <LeftBlock groups={data?.groups || []} />
          <hr className={styles['divider']} />
          <RightBlock />
        </div>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
