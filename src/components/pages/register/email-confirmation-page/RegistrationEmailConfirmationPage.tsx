import React from 'react';
import { useDispatch } from 'react-redux';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import { CustomEnvelopeOpen } from '@/components/common/icons/CustomEnvelopeOpen';
import PageLayout from '@/components/common/layout/page-layout';
import Alert, { AlertColor, AlertVariant } from '@/components/common/ui/alert';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import { AuthAPI } from '@/lib/api/auth/AuthAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';

import styles from './RegistrationEmailConfirmationPage.module.scss';

const RegistrationEmailConfirmationPage = () => {
  const router = useRouter();
  const email = router.query.email as string;
  const emailText = email
    ? 'Ми надіслали листа для підтвердження на адресу '
    : 'Ми надіслали листа для підтвердження пошти';
  const handleReturnRegister = () => {
    void router.push('/register');
  };

  let tries = 0;
  const dispatch = useDispatch();
  const handleSendAgain = async () => {
    try {
      await AuthAPI.verifyEmail({ email });
    } catch (e) {
      const errorName = e.response.data.error;
      let errorMessage;

      if (errorName === 'TooManyActionsException') {
        tries++;
        if (tries >= 5) errorMessage = 'Да ти заєбав';
        else errorMessage = ' Час для надсилання нового листа ще не сплив';
      } else if (errorName === 'NotRegisteredException') {
        errorMessage = 'Упс, реєструйся заново';
      }

      dispatch(
        showAlert({
          title: errorMessage,
          color: AlertColor.ERROR,
        }),
      );
    }
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
              <h6>Не отримав листа?</h6>
              <Button
                text={'Надіслати повторно'}
                variant={ButtonVariant.TEXT}
                size={ButtonSize.SMALL}
                color={ButtonColor.PRIMARY}
                onClick={handleSendAgain}
              />
            </div>
          </div>
          <div className={styles['alert']}>
            <Alert
              title={'Лист реєстрації діє 1 годину'}
              color={AlertColor.INFO}
              variant={AlertVariant.DARKER}
              isClosable={false}
            />
          </div>
          <Button
            text={'Повернутись до введення даних'}
            startIcon={<ChevronLeftIcon className="icon" />}
            variant={ButtonVariant.TEXT}
            size={ButtonSize.SMALL}
            onClick={handleReturnRegister}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default RegistrationEmailConfirmationPage;
