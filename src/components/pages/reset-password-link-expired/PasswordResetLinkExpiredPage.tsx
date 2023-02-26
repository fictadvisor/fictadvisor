import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

import { CustomClock } from '@/components/common/custom-svg/CustomClock';
import PageLayout from '@/components/common/layout/page-layout';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';

import styles from './PasswordResetLinkExpiredPage.module.scss';

const PasswordResetLinkExpiredPage = () => {
  return (
    <PageLayout description={'Час зміни пароля вичерпано'}>
      <div className={styles['reset-password-link-expired-page']}>
        <div className={styles['reset-password-link-expired-page-content']}>
          <div className={styles['icon']}>
            <CustomClock />
          </div>

          <h3 className={styles['headline']}>Посилання більше не активне </h3>

          <div className={styles['text-and-button']}>
            <h6>
              Час зімни пароля вичерпано. Для повторної відправки листа, натисни
              на кнопку.
            </h6>
            <div className={styles['button-wrap']}>
              <Button
                text={'Надіслати лист повторно'}
                variant={ButtonVariant.FILLED}
                size={ButtonSize.LARGE}
                color={ButtonColor.PRIMARY}
              />
            </div>
          </div>
          <Button
            text={'Повернутись до введення даних'}
            startIcon={<ChevronLeftIcon className="icon" />}
            variant={ButtonVariant.TEXT}
            size={ButtonSize.SMALL}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default PasswordResetLinkExpiredPage;
