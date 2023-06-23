import React from 'react';
import Image from 'next/image';

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
        <Image
          quality={100}
          className={styles['background-image']}
          src="/images/login-page/login-background.png"
          fill
          priority
          alt={'дуже гарна картинка'}
        />
        <div className={styles['login-page__content']}>
          <LeftBlock />
          <hr className={styles['divider']} />
          <RightBlock />
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
