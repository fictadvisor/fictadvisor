import React, { FC } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import { Input, InputSize, InputType } from '@/components/common/ui/form';
import { initialValues } from '@/components/pages/password-recovery/forgot-password-page/components/forgot-password-form/constants';
import { ForgotPasswordFormFields } from '@/components/pages/password-recovery/forgot-password-page/components/forgot-password-form/types';
import { validationSchema } from '@/components/pages/password-recovery/forgot-password-page/components/forgot-password-form/validation';
import styles from '@/components/pages/password-recovery/forgot-password-page/ForgotPasswordPage.module.scss';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import AuthAPI from '@/lib/api/auth/AuthAPI';

const ForgotPasswordForm: FC = () => {
  const { displayError } = useToastError();
  const router = useRouter();

  const handleSubmit = async (values: ForgotPasswordFormFields) => {
    try {
      const email = values.email.toLowerCase();
      await AuthAPI.forgotPassword({ email });
      await router.push(
        `/password-recovery/email-verification?email=${encodeURIComponent(
          email,
        )}`,
      );
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnMount
      validateOnChange
    >
      {({ isValid }) => (
        <Form className={styles['form']}>
          <Input
            className={styles['email-input']}
            label="Пошта"
            placeholder="example@gmail.com"
            size={InputSize.LARGE}
            type={InputType.DEFAULT}
            name="email"
          />
          <Button
            text="Надіслати лист"
            size={ButtonSize.LARGE}
            type="submit"
            disabled={!isValid}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
