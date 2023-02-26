import { FC, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button';
import {
  Checkbox,
  Dropdown,
  Input,
  InputType,
} from '@/components/common/ui/form';
import { RegisterFormFields } from '@/components/pages/register-page/components/register-form/types';
import {
  transformData,
  transformGroups,
} from '@/components/pages/register-page/components/register-form/utils';
import useAppSelector from '@/hooks/use-app-selector';
import AuthService from '@/lib/services/auth';

import { initialValues } from './constants';
import { validationSchema } from './validation';

import styles from '../../RegisterPage.module.scss';

const RegisterForm: FC = () => {
  const router = useRouter();
  const { groups } = useAppSelector(state => state.groups);

  const handleSubmit = useCallback(
    async (data: RegisterFormFields) => {
      try {
        console.log(data);
        await AuthService.register(transformData(data));
        await router.push('/');
      } catch (e) {
        console.log(e.response?.data.message);
      }
    },
    [router],
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
            label="Юзернейм"
            placeholder="Taras1814"
            name="username"
          />
          <Input
            className={styles['login-input']}
            label="Ім'я"
            placeholder="Тарас"
            name="firstName"
          />
          <Input
            className={styles['login-input']}
            label="Прізвище"
            placeholder="Шевченко"
            name="lastName"
          />
          <Input
            className={styles['login-input']}
            label="По батькові"
            placeholder="Григорович"
            name="middleName"
          />
          <Input
            className={styles['login-input']}
            label="Пошта"
            placeholder="example@gmail.com"
            name="email"
          />
          <Dropdown
            options={transformGroups(groups)}
            label={'група'}
            name={'group'}
          />
          <Checkbox label={'Я староста'} name={'isCaptain'} />
          <Input
            className={styles['login-input']}
            label="Пароль"
            type={InputType.PASSWORD}
            placeholder="example"
            name="password"
          />
          <Input
            className={styles['login-input']}
            label="Підтвердження пароля"
            type={InputType.PASSWORD}
            placeholder="example"
            name="passwordConfirmation"
          />
          <Checkbox
            label={'Погоджуюсь на обробку персональних даних'}
            name={'agreement'}
          />

          <Button text="Зареєструватись" type="submit" disabled={!isValid} />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
