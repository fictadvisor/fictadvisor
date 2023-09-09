import { useCallback, useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import { CustomEnvelopeOpen } from '@/components/common/icons/CustomEnvelopeOpen';
import Alert from '@/components/common/ui/alert';
import { AlertType, AlertVariant } from '@/components/common/ui/alert/types';
import Button from '@/components/common/ui/button';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import AuthAPI from '@/lib/api/auth/AuthAPI';

import styles from './RegistrationEmailConfirmationPage.module.scss';

const RegistrationEmailConfirmationPage = () => {
  const { displayError } = useToastError();
  const [tries, setTries] = useState(0);

  const router = useRouter();
  const email = router.query.email as string;
  const emailText = email
    ? 'Ми надіслали листа для підтвердження на адресу '
    : 'Ми надіслали листа для підтвердження пошти';
  const handleReturnRegister = () => {
    void router.push('/register');
  };

  const toast = useToast();
  const handleSendAgain = useCallback(async () => {
    try {
      await AuthAPI.verifyEmail({ email });
    } catch (error) {
      setTries(prev => prev++);
      displayError(error);
    }
  }, [toast, email, tries]);

  return (
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
            type={AlertType.INFO}
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
  );
};

export default RegistrationEmailConfirmationPage;
