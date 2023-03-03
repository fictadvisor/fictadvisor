import React from 'react';
import { FC } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import { TelegramOutlineIcon } from '@/components/common/custom-svg/TelegramOutline';
import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import ContactsBlock from '@/components/pages/account-page/components/general-tab/components/contacts-block/ContactsBlock';
import PersonalInfoBlock from '@/components/pages/account-page/components/general-tab/components/personal-info';
import useAuthentication from '@/hooks/use-authentication';
import AuthService from '@/lib/services/auth';

import styles from './GeneralTab.module.scss';

interface GeneralTabProps {
  user;
  update;
}

const GeneralTab: FC<GeneralTabProps> = ({ user, update }) => {
  const buttonText = user.telegramId
    ? 'Телеграм під’єднано'
    : "Під'єднати телеграм";

  const router = useRouter();

  const handleConnectTelegram = () => {
    void AuthService.redirectToRegisterBot(router);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['personal-info']}>
        <PersonalInfoBlock />
        <div className={styles['division']}>
          <h4 className={styles['division-text']}>Посилання на соц. мережі</h4>
          <div className={styles['white']}></div>
        </div>
        <ContactsBlock />
      </div>
      <div className={styles['avatar-and-telegram-info']}>
        <div className={styles['avatar']}>
          <img src={user.avatar} alt={'avatar'} />
        </div>
        <Button
          className={styles['telegram-button']}
          text={buttonText}
          disabled={user.telegramId}
          size={ButtonSize.MEDIUM}
          startIcon={<TelegramOutlineIcon />}
          variant={ButtonVariant.OUTLINE}
          onClick={handleConnectTelegram}
        />
        <Button
          className={styles['telegram-button-mobile']}
          text={buttonText}
          disabled={user.telegramId}
          size={ButtonSize.SMALL}
          startIcon={<TelegramOutlineIcon />}
          variant={ButtonVariant.OUTLINE}
          onClick={handleConnectTelegram}
        />
      </div>
    </div>
  );
};

export default GeneralTab;
