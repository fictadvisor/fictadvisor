import React from 'react';
import { FC } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import { TelegramOutlineIcon } from '@/components/common/custom-svg/TelegramOutline';
import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import PersonalInfoBlock from '@/components/pages/account-page/components/general-tab/components';
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
        <PersonalInfoBlock user={user} update={update} />
        <div className={styles['division']}>
          <h4 className={styles['division-text']}>Посилання на соц. мережі</h4>
          <div className={styles['white']}></div>
          <div className={styles['button']}></div>
        </div>
        <div className={styles['confirm-button']}>
          <Button
            text="Додати посилання"
            startIcon={<PlusIcon className={'icon'} />}
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.OUTLINE}
            type="submit"
            className={styles['change-password-button']}
          />
        </div>
        <div className={styles['confirm-button-mobile']}>
          <Button
            text="Додати посилання"
            startIcon={<PlusIcon className={'icon'} />}
            size={ButtonSize.SMALL}
            variant={ButtonVariant.OUTLINE}
            type="submit"
            className={styles['change-password-button']}
          />
        </div>
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
