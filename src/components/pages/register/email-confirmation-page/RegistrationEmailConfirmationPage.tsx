import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { CustomEnvelopeOpen } from '@/components/common/icons/CustomEnvelopeOpen';
import PageLayout from '@/components/common/layout/page-layout';
//TODO cut off AlertColor
import { AlertColor } from '@/components/common/ui/alert';
import Alert from '@/components/common/ui/alert-mui';
import {
  AlertType,
  AlertVariant,
} from '@/components/common/ui/alert-mui/types';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';

import styles from './RegistrationEmailConfirmationPage.module.scss';

const RegistrationEmailConfirmationPage = () => {
  const [tries, setTries] = useState(0);

  const router = useRouter();
  const email = router.query.email as string;
  const emailText = email
    ? 'Ми надіслали листа для підтвердження на адресу '
    : 'Ми надіслали листа для підтвердження пошти';
  const handleReturnRegister = () => {
    void router.push('/register');
  };

  const dispatch = useDispatch();
  const handleSendAgain = useCallback(async () => {
    try {
      await AuthAPI.verifyEmail({ email });
    } catch (error) {
      // Temporary solution
      const errorName = (error as AxiosError<{ error: string }>).response?.data
        .error;
      let errorMessage = '';

      if (errorName === 'TooManyActionsException') {
        setTries(prev => prev++);
        errorMessage =
          tries > 5
            ? 'Да ти заєбав'
            : 'Час для надсилання нового листа ще не сплив';
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
  }, [dispatch, email, tries]);

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
              type={AlertType.ERROR}
              variant={AlertVariant.DARKER}
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
