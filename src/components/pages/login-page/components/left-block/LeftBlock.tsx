import mergeClassNames from 'merge-class-names';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button';

import styles from './LeftBlock.module.scss';

const LeftBlock = () => {
  const { push } = useRouter();

  return (
    <div className={styles['left-block']}>
      <Link href="/">
        <img
          className={styles['login-logo']}
          src="/assets/login-page/new_logo.png"
          alt="fict advisor logo"
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
