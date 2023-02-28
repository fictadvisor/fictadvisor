import React, { FC } from 'react';
import { Form, Formik } from 'formik';

import Button, { ButtonSize } from '@/components/common/ui/button';
import { Input, InputSize, InputType } from '@/components/common/ui/form';
import { initialValues } from '@/components/pages/forgot-password-page/components/forgot-password-form/constants';
import { ForgotPasswordFormFields } from '@/components/pages/forgot-password-page/components/forgot-password-form/types';
import { validationSchema } from '@/components/pages/forgot-password-page/components/forgot-password-form/validation';
import styles from '@/components/pages/forgot-password-page/ForgotPasswordPage.module.scss';

const ForgotPasswordForm: FC = () => {
  const handleSubmit = (data: ForgotPasswordFormFields) => {
    console.log({ data });
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
            name="emailAddress"
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
