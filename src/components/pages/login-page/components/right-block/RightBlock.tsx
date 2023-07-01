import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import CustomTelegram from '@/components/common/icons/CustomTelegram';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import Divider from '@/components/common/ui/divider-mui';
import { DividerTextAlign } from '@/components/common/ui/divider-mui/types';
import LoginForm from '@/components/pages/login-page/components/login-form';
import useAuthentication from '@/hooks/use-authentication';
import AuthService from '@/lib/services/auth/AuthService';

import styles from './RightBlock.module.scss';

const RightBlock = () => {
  const router = useRouter();
  const redirect = router.query.redirect as string;
  const { update } = useAuthentication();
  const handleClick = async () => {
    const isSuccess = await AuthService.loginTelegram();
    update();
    if (isSuccess)
      await router.push(redirect ? redirect.replace('~', '/') : '/');
    else {
      await AuthService.redirectToRegisterBot(router);
    }
  };

  return (
    <div className={styles['right-block']}>
      <Link href="/" className={styles['mobile-login-logo']}>
        <Image
          src="/images/login-page/new-logo.png"
          alt="fict advisor logo"
          priority
          fill
        />
      </Link>
      <h3 className={styles['register-header']}>З поверненням!</h3>
      <Button
        endIcon={
          <div className="icon">
            <CustomTelegram />
          </div>
        }
        text="Увійти за допомогою"
        size={ButtonSize.SMALL}
        type="button"
        onClick={handleClick}
        className={styles['mobile-telegram-button']}
      />
      <Button
        startIcon={
          <div className="icon">
            <CustomTelegram />
          </div>
        }
        text="Увійти за допомогою Telegram"
        size={ButtonSize.LARGE}
        type="button"
        onClick={handleClick}
        className={styles['telegram-button']}
      />
      <Divider text="або" textAlign={DividerTextAlign.CENTER} />
      <LoginForm />
      <p className={styles['mobile-text']}>Ти ще не з нами? </p>
      <Button
        text="Приєднатись!"
        size={ButtonSize.SMALL}
        color={ButtonColor.SECONDARY}
        variant={ButtonVariant.OUTLINE}
        className={styles['register-mobile-button']}
        onClick={() => router.push('/register')}
      />
      <Button
        className={styles['comeback-button']}
        text="Повернутись на головну"
        startIcon={<ChevronLeftIcon className="icon" />}
        variant={ButtonVariant.TEXT}
        size={ButtonSize.SMALL}
        onClick={() => router.push('/ ')}
      />
    </div>
  );
};

export default RightBlock;
