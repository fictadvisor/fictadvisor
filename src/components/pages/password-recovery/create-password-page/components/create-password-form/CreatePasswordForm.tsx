import React, { FC } from 'react';
import { Form, Formik } from 'formik';

import Button, { ButtonSize } from '@/components/common/ui/button';
import { Input, InputSize, InputType } from '@/components/common/ui/form';
import { initialValues } from '@/components/pages/password-recovery/create-password-page/components/create-password-form/constants';
import { CreatePasswordFormFields } from '@/components/pages/password-recovery/create-password-page/components/create-password-form/types';
import { validationSchema } from '@/components/pages/password-recovery/create-password-page/components/create-password-form/validation';
import styles from '@/components/pages/password-recovery/create-password-page/CreatePasswordPage.module.scss';
const CreatePasswordForm: FC = () => {
  const handleSubmit = (data: CreatePasswordFormFields) => {
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
            defaultRemark="Не коротше 8 символів, мінімум одна літера та одна цифра"
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
          <div className={styles['confirm-button']}>
            <Button
              text="Змінити пароль"
              size={ButtonSize.LARGE}
              type="submit"
              disabled={!isValid}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePasswordForm;
