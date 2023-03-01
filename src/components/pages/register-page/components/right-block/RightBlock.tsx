import mergeClassNames from 'merge-class-names';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button';

import styles from './RightBlock.module.scss';

const RightBlock = () => {
  const { push } = useRouter();

  return (
    <div className={styles['left-block']}>
      <img
        className={styles['login-logo']}
        src="/assets/login-page/new_logo.png"
        alt="fict advisor logo"
      />
      <h3 className={mergeClassNames(styles['register-text'])}>
        Вже маєш акаунт? Заходь!
      </h3>
      <Button
        className={styles['register-button']}
        text="Вхід"
        onClick={() => {
          void push('/login');
        }}
      />
    </div>
  );
};

export default RightBlock;
