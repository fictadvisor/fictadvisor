'use client';
import React, { FC } from 'react';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import { initialValues } from '@/app/(auth)/password-recovery/[token]/components/create-password-form/constants';
import { CreatePasswordFormFields } from '@/app/(auth)/password-recovery/[token]/components/create-password-form/types';
import styles from '@/app/(auth)/password-recovery/[token]/CreatePasswordPage.module.scss';
import { createPasswordValidationSchema } from '@/app/(auth)/password-recovery/validation/createPasswordValidationSchema';
import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import { Input, InputSize, InputType } from '@/components/common/ui/form';
import useToast from '@/hooks/use-toast';
import AuthAPI from '@/lib/api/auth/AuthAPI';

interface CreatePasswordFormProps {
  token: string;
}

const CreatePasswordForm: FC<CreatePasswordFormProps> = ({ token }) => {
  const { push } = useRouter();
  const toast = useToast();
  const handleSubmit = async (data: CreatePasswordFormFields) => {
    try {
      await AuthAPI.resetPassword(token, { password: data.password });
      void push('/password-recovery/valid');
    } catch (error) {
      // TODO: remove as and create readable types
      const errorName = (error as AxiosError<{ error: string }>).response?.data
        .error;
      if (errorName === 'PasswordRepeatException') {
        toast.error('Такий пароль вже був!');
      } else {
        toast.error('Лист для верифікації сплив або неправильний код!');
        void push('/password-recovery/invalid');
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={createPasswordValidationSchema}
      validateOnMount
      validateOnChange
    >
      {({ isValid, errors }) => (
        <Form className={styles['form']}>
          <Input
            className={styles['input']}
            isSuccessOnDefault={true}
            label="Новий пароль"
            placeholder="Новий пароль"
            size={InputSize.LARGE}
            type={InputType.PASSWORD}
            name="password"
          />
          <Input
            className={styles['input']}
            isSuccessOnDefault={true}
            label="Підтверди пароль"
            placeholder="Підтверди пароль"
            size={InputSize.LARGE}
            type={InputType.PASSWORD}
            name="confirmPassword"
            disabled={errors.password != null}
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
