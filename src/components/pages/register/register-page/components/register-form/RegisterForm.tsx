import { FC, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import Button, { ButtonSize } from '@/components/common/ui/button';
import {
  Checkbox,
  Dropdown,
  Input,
  InputType,
} from '@/components/common/ui/form';
import { RegisterFormFields } from '@/components/pages/register/register-page/components/register-form/types';
import {
  transformData,
  transformGroups,
} from '@/components/pages/register/register-page/components/register-form/utils';
import AuthService from '@/lib/services/auth';

import { initialValues } from './constants';
import { validationSchema } from './validation';

import styles from '../left-block/LeftBlock.module.scss';

interface RegisterFormProps {
  groups;
}

const RegisterForm: FC<RegisterFormProps> = ({ groups }) => {
  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: RegisterFormFields) => {
      try {
        console.log(data, transformData(data));
        await AuthService.register(transformData(data));
        await router.push('/');
      } catch (e) {
        console.log(e);
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
          <div className={styles['one-line']}>
            <Dropdown
              options={transformGroups(groups)}
              label={'Група'}
              name={'group'}
            />
            <div className={styles['checkbox-container']}>
              <Checkbox label={'Я староста'} name={'isCaptain'} />
            </div>
          </div>
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
            className={styles['agreement-checkbox']}
          />

          <Button
            text="Зареєструватись"
            type="submit"
            size={ButtonSize.LARGE}
            disabled={!isValid}
            className={styles['register-button']}
          />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
