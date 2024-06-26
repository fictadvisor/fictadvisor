'use client';

import { FC, useCallback } from 'react';
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
import useAuthentication from '@/hooks/use-authentication';
import AuthService from '@/lib/services/auth';
import getErrorMessage from '@/lib/utils/getErrorMessage';

import * as sxStyles from './LoginForm.styles';

const LoginForm: FC = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const { update } = useAuthentication();
  const redirect = searchParams?.get('redirect') as string;

  const handleSubmit = useCallback(
    async (
      data: LoginFormFields,
      { setErrors }: FormikHelpers<LoginFormFields>,
    ) => {
      try {
        if (data.username.includes('@'))
          data.username = data.username.toLowerCase();
        await AuthService.login(data);
        await update();
        push(redirect ? redirect.replace('~', '/') : '/');
      } catch (error: unknown) {
        const message = getErrorMessage(error);
        if (message === 'The password is incorrect') {
          setErrors({
            password: 'Неправильний пароль',
          });
        } else {
          setErrors({
            username: 'Користувача з таким паролем та поштою не знайдено',
            password: 'Користувача з таким паролем та поштою не знайдено',
          });
        }
      }
    },
    [push, redirect, update],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount
      validationSchema={validationSchema}
    >
      {({ isValid }) => (
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
            disabled={!isValid}
            sx={sxStyles.loginButton}
          />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
