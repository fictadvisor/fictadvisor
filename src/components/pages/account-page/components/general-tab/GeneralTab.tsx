import React from 'react';
import { FC } from 'react';
import { useRouter } from 'next/router';

import { TelegramForAccount } from '@/components/common/icons/TelegramForAccount';
import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import CustomDivider from '@/components/pages/account-page/components/divider';
import ContactsBlock from '@/components/pages/account-page/components/general-tab/components/contacts-block/ContactsBlock';
import PersonalInfoBlock from '@/components/pages/account-page/components/general-tab/components/personal-info';
import useAuthentication from '@/hooks/use-authentication';
import AuthService from '@/lib/services/auth';

import styles from './GeneralTab.module.scss';

const GeneralTab: FC = () => {
  const { user } = useAuthentication();
  const buttonText = user.telegramId
    ? 'Telegram під’єднано'
    : "Під'єднати Telegram";

  const router = useRouter();

  const handleConnectTelegram = () => {
    void AuthService.redirectToRegisterBot(router);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['personal-info']}>
        <PersonalInfoBlock />
        <CustomDivider text="Посилання на соц. мережі" />
        <ContactsBlock />
      </div>
      <div className={styles['avatar-and-telegram-info']}>
        <div className={styles['avatar']}>
          <img src={user.avatar} alt="avatar" />
        </div>
        <Button
          className={styles['telegram-button']}
          text={buttonText}
          disabled={user.telegramId}
          size={ButtonSize.MEDIUM}
          startIcon={<TelegramForAccount />}
          variant={ButtonVariant.OUTLINE}
          onClick={handleConnectTelegram}
        />
        <Button
          className={styles['telegram-button-mobile']}
          text={buttonText}
          disabled={user.telegramId}
          size={ButtonSize.SMALL}
          startIcon={<TelegramForAccount />}
          variant={ButtonVariant.OUTLINE}
          onClick={handleConnectTelegram}
        />
      </div>
    </div>
  );
};

export default GeneralTab;
