import { useState } from 'react';
import { useRouter } from 'next/router';

import CustomTelegramIcon from '@/components/common/custom-svg/CustomTelegramIcon';
import { AlertColor, AlertVariant } from '@/components/common/ui/alert';
import AlertPopup from '@/components/common/ui/alert-popup';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import Divider, { DividerTextPosition } from '@/components/common/ui/divider';
import LoginForm from '@/components/pages/login-page/components/login-form';
import authService from '@/lib/services/auth/AuthService';

import styles from './RightBlock.module.scss';

const RightBlock = () => {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const handleClick = async () => {
    const isSuccess = await authService.loginTelegram();
    if (isSuccess) await router.push('/');
    else setIsError(true);
    setTimeout(() => setIsError(false), 7500);
  };

  return (
    <div className={styles['right-block']}>
      {isError && (
        <AlertPopup
          title="Неможливо авторизуватись за допомогою telegram"
          variant={AlertVariant.FILLED}
          color={AlertColor.ERROR}
        />
      )}
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
      />
    </div>
  );
};

export default RightBlock;
