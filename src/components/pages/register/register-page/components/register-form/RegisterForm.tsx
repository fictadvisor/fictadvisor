import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import { AlertColor } from '@/components/common/ui/alert';
import Button, { ButtonSize } from '@/components/common/ui/button';
import {
  Checkbox,
  Dropdown,
  DropDownSize,
  Input,
  InputType,
} from '@/components/common/ui/form';
import { RegisterFormFields } from '@/components/pages/register/register-page/components/register-form/types';
import {
  transformData,
  transformGroups,
} from '@/components/pages/register/register-page/components/register-form/utils';
import { AuthAPI } from '@/lib/api/auth/AuthAPI';
import AuthService from '@/lib/services/auth';
import StorageUtil from '@/lib/utils/StorageUtil';
import { showAlert } from '@/redux/reducers/alert.reducer';

import { initialValues } from './constants';
import { validationSchema } from './validation';

import styles from '../left-block/LeftBlock.module.scss';

interface RegisterFormProps {
  groups;
}

const RegisterForm: FC<RegisterFormProps> = ({ groups }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (data: RegisterFormFields) => {
      try {
        const hasCaptain = await AuthAPI.groupHasCaptain(data.group);
        if (data.isCaptain && hasCaptain) {
          dispatch(
            showAlert({
              title: 'В групі вже є староста',
              color: AlertColor.ERROR,
            }),
          );
        } else if (!data.isCaptain && !hasCaptain) {
          dispatch(
            showAlert({
              title: 'Дочекайся, поки зареєструється староста',
              color: AlertColor.ERROR,
            }),
          );
        } else {
          await AuthService.register(transformData(data));
          StorageUtil.deleteTelegramInfo();
          await router.push(`/register/email-verification?email=${data.email}`);
        }
      } catch (e) {
        const errorName = e.response.data.error;

        if (errorName === 'AlreadyRegisteredException') {
          dispatch(
            showAlert({
              title: 'Пошта або юзернейм вже зайняті',
              color: AlertColor.ERROR,
            }),
          );
        } else if (errorName === 'InvalidTelegramCredentialsException') {
          dispatch(
            showAlert({
              title: 'Як ти це зробив? :/',
              color: AlertColor.ERROR,
            }),
          );
        } else if (errorName === 'InvalidBodyException') {
          dispatch(
            showAlert({
              title: 'Некорректно введені дані',
              color: AlertColor.ERROR,
            }),
          );
        } else {
          dispatch(
            showAlert({
              title: 'Як ти це зробив? :/',
              color: AlertColor.ERROR,
            }),
          );
        }
      }
    },
    [dispatch, router],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount
      validateOnChange
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
            label="Прізвище"
            placeholder="Шевченко"
            name="lastName"
          />
          <Input
            className={styles['login-input']}
            label="Ім'я"
            placeholder="Тарас"
            name="firstName"
          />
          <Input
            className={styles['login-input']}
            label="По батькові"
            placeholder="Григорович (опціонально)"
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
              size={DropDownSize.LARGE}
              options={transformGroups(groups)}
              label="Група"
              name="group"
              placeholder="вибери зі списку"
            />
            <div className={styles['checkbox-container']}>
              <Checkbox label={'Я староста'} name={'isCaptain'} />
            </div>
          </div>
          <Input
            className={styles['login-input']}
            label="Пароль"
            type={InputType.PASSWORD}
            placeholder="введи свій пароль"
            name="password"
          />
          <Input
            className={styles['login-input']}
            label="Підтвердження пароля"
            type={InputType.PASSWORD}
            placeholder="підтверди свій пароль"
            name="passwordConfirmation"
          />
          <Checkbox
            label={'Погоджуюсь на обробку персональних даних'}
            name={'agreement'}
            // className={styles['agreement-checkbox']}
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
