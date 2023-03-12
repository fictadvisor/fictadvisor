import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import CustomTelegramIcon from '@/components/common/custom-svg/CustomTelegramIcon';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import Divider, { DividerTextPosition } from '@/components/common/ui/divider';
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
      <img
        className={styles['mobile-login-logo']}
        src="/assets/login-page/new_logo.png"
        alt="fict advisor logo"
      />
      <h3 className={styles['register-header']}>З поверненням!</h3>
      <Button
        endIcon={
          <div className="icon">
            <CustomTelegramIcon />
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
            <CustomTelegramIcon />
          </div>
        }
        text="Увійти за допомогою Telegram"
        size={ButtonSize.LARGE}
        type="button"
        onClick={handleClick}
        className={styles['telegram-button']}
      />
      <Divider
        text="або"
        textPosition={DividerTextPosition.CENTER}
        className={styles['right-divider']}
      />
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
