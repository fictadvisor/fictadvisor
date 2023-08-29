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
import useToast from '@/hooks/use-toast';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import getErrorMessage from '@/lib/utils/getErrorMessage';

const ForgotPasswordForm: FC = () => {
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (values: ForgotPasswordFormFields) => {
    try {
      const email = values.email.toLowerCase();
      await AuthAPI.forgotPassword({ email });
      await router.push(`/password-recovery/email-verification?email=${email}`);
    } catch (error) {
      const message = getErrorMessage(error);
      message
        ? toast.error(message, '', 3000)
        : toast.error('Щось пішло не так, спробуй пізніше!');
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
