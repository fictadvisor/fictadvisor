'use client';

import { FC } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';

import { initialValues } from '@/app/(auth)/login/components/login-form-block/components/login-form/constants';
import { LoginFormFields } from '@/app/(auth)/login/components/login-form-block/components/login-form/types';
import { validationSchema } from '@/app/(auth)/login/components/login-form-block/components/login-form/validation';
import styles from '@/app/(auth)/login/components/login-form-block/LoginFormBlock.module.scss';
import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import CustomLink from '@/components/common/ui/custom-link';
import { CustomLinkType } from '@/components/common/ui/custom-link/types';
import { Input, InputSize, InputType } from '@/components/common/ui/form';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import { setAuthTokens } from '@/lib/api/auth/ServerAuthApi';
import getErrorMessage from '@/lib/utils/getErrorMessage';

import * as sxStyles from './LoginForm.styles';

export const LoginForm: FC = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') as string;

  const handleSubmit = async (
    data: LoginFormFields,
    { setErrors }: FormikHelpers<LoginFormFields>,
  ) => {
    try {
      if (data.username.includes('@'))
        data.username = data.username.toLowerCase();
      const tokens = await AuthAPI.auth(data);
      await setAuthTokens(tokens);
      push(redirect ? redirect.replace('~', '/') : '/');
    } catch (error) {
      const message = getErrorMessage(error);
      setErrors(
        message === 'The password is incorrect'
          ? { password: 'Неправильний пароль' }
          : { username: 'Користувача з таким паролем та поштою не знайдено' },
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount
      validationSchema={validationSchema}
    >
      {({ isValid, isSubmitting }) => (
        <Form className={styles['form']}>
          <Input
            label="Пошта або юзернейм"
            placeholder="введи свою пошту"
            size={InputSize.LARGE}
            type={InputType.DEFAULT}
            name="username"
          />
          <Input
            label={'Пароль'}
            placeholder="введи свій пароль"
            size={InputSize.LARGE}
            type={InputType.PASSWORD}
            name="password"
          />
          <CustomLink
            href="/password-recovery"
            type={CustomLinkType.BLUE}
            text="Забув пароль?"
            sx={sxStyles.passwordLink}
          />
          <Button
            text="Увійти"
            size={ButtonSize.LARGE}
            type="submit"
            loadingOnClick
            disabled={!isValid || isSubmitting}
            sx={sxStyles.loginButton}
          />
        </Form>
      )}
    </Formik>
  );
};
