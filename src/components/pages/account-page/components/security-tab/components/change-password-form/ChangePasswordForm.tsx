import React, { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import { AlertColor } from '@/components/common/ui/alert';
import AlertPopup from '@/components/common/ui/alert-popup';
import Button, { ButtonSize } from '@/components/common/ui/button';
import { Input, InputType } from '@/components/common/ui/form';
import Link from '@/components/common/ui/link';
import useAuthentication from '@/hooks/use-authentication';
import { AuthAPI } from '@/lib/api/auth/AuthAPI';
import StorageUtil from '@/lib/utils/StorageUtil';

import { validationSchema } from './validation';

import styles from '../../SecurityTab.module.scss';

const ChangePasswordForm = () => {
  const router = useRouter();

  const handleSubmit = async (data, { setErrors }) => {
    try {
      const { accessToken, refreshToken } = await AuthAPI.changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      StorageUtil.setTokens(accessToken, refreshToken);
      router.reload();
    } catch (e) {
      const name = e.response?.data.error;
      if (name === 'PasswordRepeatException') {
        setErrors({
          oldPassword: 'Не можна встановлювати пароль, ідентичний існуючому',
          newPassword: 'Не можна встановлювати пароль, ідентичний існуючому',
          confirmationPassword:
            'Не можна встановлювати пароль, ідентичний існуючому',
        });
      } else if (name === 'Unauthorized') {
        setErrors({
          oldPassword: 'Введений пароль недійсний',
        });
      }
    }
    console.log(data);
  };

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        passwordConfirmation: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
      validateOnChange
    >
      {({ isValid, errors }) => (
        <Form>
          <Input
            className={styles['input']}
            label="Поточний пароль"
            placeholder="введи свій пароль"
            type={InputType.PASSWORD}
            name="oldPassword"
          />
          {errors.oldPassword === 'Введений пароль недійсний' && (
            <p className="body-primary">
              Забули пароль? Щоб відновити, перейдіть за{' '}
              <Link href="/password-recovery" text="посиланням" />
            </p>
          )}
          <Input
            className={styles['input']}
            label="Новий пароль"
            placeholder="придумай новий пароль"
            type={InputType.PASSWORD}
            name="newPassword"
            disabled={!!errors.oldPassword}
          />
          <Input
            className={styles['input']}
            label="Підтвердження паролю"
            placeholder="підтверди новий пароль"
            type={InputType.PASSWORD}
            name="passwordConfirmation"
            disabled={!!errors.oldPassword || !!errors.newPassword}
          />
          <div className={styles['confirm-button']}>
            <Button
              text="Оновити пароль"
              startIcon={<CustomCheck />}
              size={ButtonSize.MEDIUM}
              type="submit"
              disabled={!isValid}
              className={styles['change-password-button']}
            />
          </div>
          <div className={styles['confirm-button-mobile']}>
            <Button
              text="Оновити пароль"
              startIcon={<CustomCheck />}
              size={ButtonSize.SMALL}
              type="submit"
              disabled={!isValid}
              className={styles['change-password-button']}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
