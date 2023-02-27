import React, { FC } from 'react';
import { Form, Formik } from 'formik';

import Button, { ButtonSize } from '@/components/common/ui/button';
import { Input, InputSize, InputType } from '@/components/common/ui/form';
import { initialValues } from '@/components/pages/create-password-page/components/create-password-form/constants';
import { CreatePasswordFormFields } from '@/components/pages/create-password-page/components/create-password-form/types';
import { validationSchema } from '@/components/pages/create-password-page/components/create-password-form/validation';
import styles from '@/components/pages/create-password-page/CreatePasswordPage.module.scss';
const CreatePasswordForm: FC = () => {
  const handleSubmit = (data: CreatePasswordFormFields) => {
    console.log({ data });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnChange
    >
      {({ isValid, errors }) => (
        <Form className={styles['form']}>
          <Input
            className={styles['input']}
            isSuccessOnDefault={true}
            label="Новий пароль"
            placeholder="user2000"
            size={InputSize.LARGE}
            type={InputType.PASSWORD}
            name="createPassword"
            defaultRemark="Має бути не коротше 8 символів та містити спеціальні знаки ?!#$*()"
          />
          <Input
            className={styles['input']}
            isSuccessOnDefault={true}
            label="Підтверди пароль"
            placeholder="input"
            size={InputSize.LARGE}
            type={InputType.PASSWORD}
            name="confirmPassword"
            disabled={errors.createPassword != null}
          />
          <Button
            text="Змінити пароль"
            size={ButtonSize.LARGE}
            type="submit"
            disabled={!isValid}
          />
        </Form>
      )}
    </Formik>
  );
};

export default CreatePasswordForm;
