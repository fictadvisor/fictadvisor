import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import CustomTelegram from '@/components/common/icons/CustomTelegram';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import Divider, { DividerTextPosition } from '@/components/common/ui/divider';
import RegisterForm from '@/components/pages/register/register-page/components/register-form';
import AuthService from '@/lib/services/auth/AuthService';
import StorageUtil from '@/lib/utils/StorageUtil';

import styles from './LeftBlock.module.scss';

interface LeftBlockProps {
  groups;
}

const LeftBlock: FC<LeftBlockProps> = ({ groups }) => {
  const router = useRouter();
  const hasTelegram = !!StorageUtil.getTelegramInfo();
  const handleClick = async () => {
    await AuthService.redirectToRegisterBot(router);
  };

  return (
    <div className={styles['left-block']}>
      <Link href="/" className={styles['mobile-register-logo-container']}>
        <Image
          src="/images/login-page/new-logo.png"
          alt="fict advisor logo"
          fill
        />
      </Link>
      <h3 className={styles['login-header']}>Створи акаунт</h3>
      {hasTelegram ? (
        <h6 className={styles['telegram-connected']}>
          Telegram приєднано, дозаповни усі поля
        </h6>
      ) : (
        <>
          <Button
            startIcon={
              <div className="icon">
                <CustomTelegram />
              </div>
            }
            text="Приєднай Telegram"
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
            text="Приєднай Telegram"
            size={ButtonSize.LARGE}
            type="button"
            onClick={handleClick}
            className={styles['telegram-button']}
          />
          <Divider
            text="та введи дані нижче"
            textPosition={DividerTextPosition.CENTER}
            className={styles['right-divider']}
          />
        </>
      )}
      <RegisterForm groups={groups || []} />
      <p className={styles['mobile-text']}>Вже маєш аккаунт?</p>
      <Button
        text="Увійти!"
        size={ButtonSize.SMALL}
        color={ButtonColor.SECONDARY}
        variant={ButtonVariant.OUTLINE}
        className={styles['login-mobile-button']}
        onClick={() => {
          void router.push('/login');
        }}
      />
    </div>
  );
};

export default LeftBlock;
