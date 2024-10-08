'use client';
import React, { FC } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import { RegisterFormFields } from '@/app/(auth)/register/components/register-form/types';
import {
  transformData,
  transformGroups,
} from '@/app/(auth)/register/components/register-form/utils';
import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import { Input, InputType } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Checkbox from '@/components/common/ui/form/with-formik/checkbox';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import GroupAPI from '@/lib/api/group/GroupAPI';
import StorageUtil from '@/lib/utils/StorageUtil';

import { initialValues } from './constants';
import * as stylesMUI from './RegisterForm.styles';
import { validationSchema } from './validation';

import styles from './FormStyles.module.scss';

export const RegisterForm: FC = () => {
  const { data } = useQuery({
    queryKey: ['groups'],
    queryFn: () => GroupAPI.getAll(),
    refetchOnWindowFocus: false,
  });

  const { displayError } = useToastError();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (data: RegisterFormFields) => {
    try {
      const { isCaptain, group, email } = data;
      const hasCaptain = await AuthAPI.groupHasCaptain(group);

      if (isCaptain && hasCaptain) {
        toast.error('В групі вже є староста');
      } else if (!isCaptain && !hasCaptain) {
        toast.error('Дочекайся, поки зареєструється староста');
      } else {
        const telegramInfo = StorageUtil.getTelegramInfo();
        StorageUtil.deleteTelegramInfo();
        await AuthAPI.register({
          ...transformData(data),
          ...(telegramInfo && { telegram: telegramInfo.telegram }),
        });
        router.push(
          `/register/email-verification?email=${encodeURIComponent(email)}`,
        );
      }
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount
      validateOnChange
      enableReinitialize
      validationSchema={validationSchema}
    >
      {({ isValid, isSubmitting }) => (
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
              options={transformGroups(data?.groups || [])}
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
            loadingOnClick
            disabled={!isValid || isSubmitting}
            sx={stylesMUI.registerButton}
          />
        </Form>
      )}
    </Formik>
  );
};
