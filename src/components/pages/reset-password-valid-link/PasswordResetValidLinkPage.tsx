import React from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

import PageLayout from '@/components/common/layout/page-layout';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';

import styles from './PasswordResetValidLinkPage.module.scss';

const PasswordResetValidLinkPage = () => {
  return (
    <PageLayout description={'Пароль успішно змінено'}>
      <div className={styles['reset-password-valid-link-page']}>
        <div className={styles['reset-password-valid-link-page-content']}>
          <div className={styles['icon']}>
            <ShieldCheckIcon />
          </div>

          <h3 className={styles['headline']}>Пароль змінено</h3>

          <div className={styles['text-and-button']}>
            <h6 className={styles['text']}>
              Твій пароль було успішно змінено! Натисни нижче, щоб повернутися
              до поля авторизації.
            </h6>
            <div className={styles['button-wrap']}>
              <Button
                text={'Повернутися до авторизації'}
                variant={ButtonVariant.FILLED}
                size={ButtonSize.LARGE}
                color={ButtonColor.PRIMARY}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PasswordResetValidLinkPage;
