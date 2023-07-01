import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button';

import styles from './RightBlock.module.scss';

const RightBlock = () => {
  const router = useRouter();

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
      <h3 className={styles['login-text']}>Вже маєш акаунт? Заходь!</h3>
      <Button
        className={styles['login-button']}
        text="Вхід"
        onClick={() => {
          void router.push('/login');
        }}
      />
    </div>
  );
};

export default RightBlock;
