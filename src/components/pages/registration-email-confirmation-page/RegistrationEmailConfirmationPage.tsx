import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import { CustomEnvelopeOpen } from '@/components/common/custom-svg/CustomEnvelopeOpen';
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
  const emailText = email
    ? 'Ми надіслали листа для підтвердження пошти на адресу '
    : 'Ми надіслали листа для підтвердження пошти';
  const returnRegister = () => {
    router.push('/register');
  };
  return (
    <PageLayout
      hasHeader={false}
      hasFooter={false}
      description={'Перевірка пошти при реєстрації'}
    >
      <div className={styles['registration-email-confirmation-page']}>
        <div className={styles['registration-email-confirmation-page-content']}>
          <div className={styles['icon']}>
            <CustomEnvelopeOpen />
          </div>

          <h3 className={styles['headline']}>Перевір свою пошту</h3>

          <div className={styles['text-and-button']}>
            <h6>
              {emailText}
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
            size={ButtonSize.SMALL}
            onClick={returnRegister}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default RegistrationEmailConfirmationPage;
