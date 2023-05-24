import { FC, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import Button, { ButtonSize } from '@/components/common/ui/button';
import { Input, InputSize, InputType } from '@/components/common/ui/form';
import CustomLink from '@/components/common/ui/link';
import { initialValues } from '@/components/pages/login-page/components/login-form/constants';
import { LoginFormFields } from '@/components/pages/login-page/components/login-form/types';
import { validationSchema } from '@/components/pages/login-page/components/login-form/validation';
import useAuthentication from '@/hooks/use-authentication';
import AuthService from '@/lib/services/auth';

import styles from '../right-block/RightBlock.module.scss';

const LoginForm: FC = () => {
  const { push, query } = useRouter();
  const { update } = useAuthentication();
  const redirect = query.redirect as string;

  const handleSubmit = useCallback(
    async (data: LoginFormFields, { setErrors }) => {
      try {
        if (data.username.includes('@'))
          data.username = data.username.toLowerCase();
        await AuthService.login(data);
        update();
        await push(redirect ? redirect.replace('~', '/') : '/');
      } catch (e) {
        setErrors({
          username: 'Користувача з таким паролем та поштою не знайдено',
          password: 'Користувача з таким паролем та поштою не знайдено',
        });
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
            className={styles['login-input']}
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
            text="Забув пароль?"
            className={styles['password-link']}
          />
          <Button
            text="Увійти"
            size={ButtonSize.LARGE}
            type="submit"
            disabled={!isValid}
            className={styles['login-button']}
          />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
