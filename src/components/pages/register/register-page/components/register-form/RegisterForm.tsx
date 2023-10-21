import React, { FC, useCallback } from 'react';
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import { Input, InputType } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Checkbox from '@/components/common/ui/form/with-formik/checkbox';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import { RegisterFormFields } from '@/components/pages/register/register-page/components/register-form/types';
import {
  transformData,
  transformGroups,
} from '@/components/pages/register/register-page/components/register-form/utils';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import { GetAllResponse } from '@/lib/api/group/types/GetAllResponse';
import AuthService from '@/lib/services/auth';
import StorageUtil from '@/lib/utils/StorageUtil';

import { initialValues } from './constants';
import * as stylesMUI from './RegisterForm.styles';
import { validationSchema } from './validation';

import styles from './FormStyles.module.scss';
const RegisterForm: FC<GetAllResponse> = ({ groups }) => {
  const { displayError } = useToastError();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = useCallback(
    async (data: RegisterFormFields) => {
      try {
        const { isCaptain, group, email } = data;
        const hasCaptain = await AuthAPI.groupHasCaptain(group);

        if (isCaptain && hasCaptain) {
          toast.error('В групі вже є староста');
        } else if (!isCaptain && !hasCaptain) {
          toast.error('Дочекайся, поки зареєструється староста');
        } else {
          await AuthService.register(transformData(data));
          StorageUtil.deleteTelegramInfo();
          await router.push(
            `/register/email-verification?email=${encodeURIComponent(email)}`,
          );
        }
      } catch (error) {
        displayError(error);
      }
    },
    [toast, router],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount
      validateOnChange
      enableReinitialize
      validationSchema={validationSchema}
    >
      {({ isValid }) => (
        <Form className={styles['form']}>
          <Input
            label="Юзернейм"
            placeholder="Використовуй латиницю без пробілів"
            name="username"
          />
          <Input
            label="Прізвище"
            placeholder="Вводь справжнє прізвище для коректної інформації"
            name="lastName"
          />
          <Input
            label="Ім'я"
            placeholder="Вводь справжнє ім'я для коректної інформації"
            name="firstName"
          />
          <Input
            label="По батькові"
            placeholder="Вводь справжнє по батькові для коректної інформації"
            name="middleName"
          />
          <Input label="Пошта" placeholder="example@gmail.com" name="email" />
          <Box sx={stylesMUI.dropdownContainer}>
            <FormikDropdown
              size={FieldSize.LARGE}
              options={transformGroups(groups)}
              label="Група"
              name="group"
              placeholder="вибери зі списку"
            />
            <Box sx={stylesMUI.checkboxContainer}>
              <Checkbox label="Я староста" name="isCaptain" />
            </Box>
          </Box>
          <Input
            label="Пароль"
            type={InputType.PASSWORD}
            placeholder="user2000"
            name="password"
          />
          <Input
            label="Підтвердження пароля"
            type={InputType.PASSWORD}
            placeholder="user2000"
            name="passwordConfirmation"
          />
          <Checkbox
            label={'Погоджуюсь на обробку персональних даних'}
            name={'agreement'}
            sx={stylesMUI.checkbox}
          />
          <Button
            text="Зареєструватись"
            type="submit"
            size={ButtonSize.LARGE}
            disabled={!isValid}
            sx={stylesMUI.registerButton}
          />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
