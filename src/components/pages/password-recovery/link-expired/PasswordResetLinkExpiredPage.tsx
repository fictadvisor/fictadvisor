import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import { CustomClock } from '@/components/common/custom-svg/CustomClock';
import PageLayout from '@/components/common/layout/page-layout';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';

import styles from './PasswordResetLinkExpiredPage.module.scss';

const PasswordResetLinkExpiredPage = () => {
  const router = useRouter();
  const returnRegister = () => {
    router.push('/register');
  };

  const handleSubmit = () => {
    router.push('/password-recovery');
  };

  // const handleSubmit = async (data: ForgotPasswordFormFields) => {
  //   let errorMessage;
  //   try {
  //     await AuthAPI.forgotPassword({ email: data.emailAddress });
  //     await router.push(
  //       `/password-recovery/email-verification?email=${data.emailAddress}`,
  //     );
  //   } catch (e) {
  //     const errorName = e.response.data.error;
  //     if (errorName == 'InvalidBodyException') {
  //       errorMessage = 'Невірно введено пошту для відновлення';
  //     } else if (errorName == 'NotRegisteredException') {
  //       errorMessage = 'На цю пошту не зареєстровано користувача';
  //     }
  //     // dispatch(
  //     //   showAlert({
  //     //     title: errorMessage,
  //     //     color: AlertColor.ERROR,
  //     //   }),
  //     // );
  //   }
  // };

  return (
    <PageLayout
      hasHeader={false}
      hasFooter={false}
      description={'Час зміни пароля вичерпано'}
    >
      <div className={styles['reset-password-link-expired-page']}>
        <div className={styles['reset-password-link-expired-page-content']}>
          <div className={styles['icon']}>
            <CustomClock />
          </div>

          <h3 className={styles['headline']}>Посилання більше не активне </h3>

          <div className={styles['text-and-button']}>
            <h6>
              Час зміни пароля вичерпано. Для повторної відправки листа, натисни
              на кнопку.
            </h6>
            <div className={styles['button-wrap']}>
              <Button
                text={'Надіслати лист'}
                variant={ButtonVariant.FILLED}
                size={ButtonSize.LARGE}
                color={ButtonColor.PRIMARY}
                onClick={handleSubmit}
              />
            </div>
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

export default PasswordResetLinkExpiredPage;
