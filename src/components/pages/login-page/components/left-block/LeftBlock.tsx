import React from 'react';
import mergeClassNames from 'merge-class-names';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button';

import styles from './LeftBlock.module.scss';

const LeftBlock = () => {
  const { push } = useRouter();

  return (
    <div className={styles['left-block']}>
      <Link href="/">
        <Image
          className={styles['login-logo']}
          src="/images/login-page/new-logo.png"
          alt="fict advisor logo"
          priority
          width={300}
          height={54}
        />
      </Link>
      <h3 className={mergeClassNames(styles['register-text'])}>
        Ти ще не з нами? Приєднуйся!
      </h3>
      <Button
        className={styles['register-button']}
        text="Зареєструватися"
        onClick={() => {
          void push('/register');
        }}
      />
    </div>
  );
};

export default LeftBlock;
