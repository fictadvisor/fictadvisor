import React from 'react';
import { useRouter } from 'next/router';

import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import ImmutableInput from '@/components/common/ui/immutable-input';
import ChangePasswordForm from '@/components/pages/account-page/components/security-tab/components/change-password-form';
import useAuthentication from '@/hooks/use-authentication';
import AuthService from '@/lib/services/auth';

import styles from './SecurityTab.module.scss';

const SecurityTab = () => {
  const { push } = useRouter();
  const { user } = useAuthentication();
  return (
    <div className={styles['container']}>
      <div className={styles['division']}>
        <h4 className={styles['division-text']}>Зміна паролю</h4>
        <div className={styles['white']}></div>
        <div className={styles['button']}></div>
      </div>
      <div className={styles['input-form']}>
        <ChangePasswordForm />
      </div>
      <div className={styles['division']}>
        <h4 className={styles['division-text']}>Юзернейм і пошта</h4>
        <div className={styles['white']}></div>
        <div className={styles['button']}></div>
      </div>
      <div className={styles['user-information']}>
        <ImmutableInput label="Юзернейм" value={user.username} />
        <ImmutableInput label="Пошта" value={user.email} />
      </div>
      <div className={styles['division']}>
        <div className={styles['white']}></div>
        <div className={styles['button']}></div>
      </div>
      <div className={styles['button-container']}>
        <Button
          text={'Вийти з акаунту'}
          variant={ButtonVariant.FILLED}
          color={ButtonColor.SECONDARY}
          size={ButtonSize.MEDIUM}
          onClick={async () => {
            await AuthService.logout();
            await push('/login');
          }}
        />
      </div>
      <div className={styles['button-container-mobile']}>
        <Button
          text={'Вийти з акаунту'}
          variant={ButtonVariant.FILLED}
          color={ButtonColor.SECONDARY}
          size={ButtonSize.SMALL}
        />
      </div>
    </div>
  );
};

export default SecurityTab;
