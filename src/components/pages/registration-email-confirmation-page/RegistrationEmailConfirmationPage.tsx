import React from 'react';
import { ChevronLeftIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout';
import Alert, { AlertColor, AlertVariant } from '@/components/common/ui/alert';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';

import styles from './RegistrationEmailConfirmationPage.module.scss';

const RegistrationEmailConfirmationPage = () => {
  const router = useRouter();
  const { email } = router.query;

  return (
    <PageLayout description={'Сторінка для перевірки пароя при реєстрації'}>
      <div className={styles['registration-email-confirmation-page']}>
        <div className={styles['registration-email-confirmation-page-content']}>
          <div className={styles['icon']}>
            <EnvelopeOpenIcon />
          </div>
          <div className={styles['headline']}>
            <h3>Перевір свою пошту</h3>
          </div>
          <div className={styles['text-and-button']}>
            <h6>
              Ми надіслали листа для підтвердження пошти на адресу{' '}
              <span className={styles['email']}>{email}</span>
            </h6>
            <div className={styles['email-not-received']}>
              <h6>Не отримали листа?</h6>
              <div className={styles['mobile']}>
                <Button
                  text={'Надіслати повторно'}
                  variant={ButtonVariant.TEXT}
                  size={ButtonSize.SMALL}
                  color={ButtonColor.PRIMARY}
                />
              </div>
              <div className={styles['desktop']}>
                <Button
                  color={ButtonColor.PRIMARY}
                  text={'Надіслати повторно'}
                  variant={ButtonVariant.TEXT}
                  size={ButtonSize.LARGE}
                />
              </div>
            </div>
          </div>
          <div className={styles['alert']}>
            <Alert
              title={'Лист реєстрації діє 1 годину'}
              color={AlertColor.INFO}
              variant={AlertVariant.DARKER}
            ></Alert>
          </div>
          <Button
            text={'Повернутись до введення даних'}
            startIcon={<ChevronLeftIcon className="icon" />}
            variant={ButtonVariant.TEXT}
            size={ButtonSize.MEDIUM}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default RegistrationEmailConfirmationPage;
