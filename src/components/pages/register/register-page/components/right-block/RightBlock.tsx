import mergeClassNames from 'merge-class-names';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button';

import styles from './RightBlock.module.scss';

const RightBlock = () => {
  const { push } = useRouter();

  return (
    <div className={styles['left-block']}>
      <Link href="/">
        <img
          className={styles['login-logo']}
          src="/images/login-page/new-logo.png"
          alt="fict advisor logo"
        />
      </Link>
      <h3 className={mergeClassNames(styles['login-text'])}>
        Вже маєш акаунт? Заходь!
      </h3>
      <Button
        className={styles['login-button']}
        text="Вхід"
        onClick={() => {
          void push('/login');
        }}
      />
    </div>
  );
};

export default RightBlock;
