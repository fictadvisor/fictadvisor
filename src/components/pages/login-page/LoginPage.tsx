import React from 'react';
import Image from 'next/image';

import LeftBlock from '@/components/pages/login-page/components/left-block';
import RightBlock from '@/components/pages/login-page/components/right-block';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <div className={styles['login-page']}>
      <Image
        quality={100}
        className={styles['background-image']}
        src="/images/login-page/login-background.png"
        fill
        priority
        alt="дуже гарна картинка"
      />
      <div className={styles['login-page__content']}>
        <LeftBlock />
        <hr className={styles['divider']} />
        <RightBlock />
      </div>
    </div>
  );
};

export default LoginPage;
