import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import { AlertColor } from '@/components/common/ui/alert';
import Button, { ButtonSize } from '@/components/common/ui/button';
import { Input, InputSize, InputType } from '@/components/common/ui/form';
import { initialValues } from '@/components/pages/password-recovery/create-password-page/components/create-password-form/constants';
import { CreatePasswordFormFields } from '@/components/pages/password-recovery/create-password-page/components/create-password-form/types';
import { validationSchema } from '@/components/pages/password-recovery/create-password-page/components/create-password-form/validation';
import styles from '@/components/pages/password-recovery/create-password-page/CreatePasswordPage.module.scss';
import { AuthAPI } from '@/lib/api/auth/AuthAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';

const CreatePasswordForm: FC = () => {
  const { query, push } = useRouter();
  const token = query.token as string;
  const dispatch = useDispatch();
  const handleSubmit = async (data: CreatePasswordFormFields) => {
    try {
      await AuthAPI.resetPassword(token, { password: data.confirmPassword });
      void push('/password-recovery/valid');
    } catch (e) {
      const errorName = e.response.data.error;
      if (errorName === 'PasswordRepeatException') {
        dispatch(
          showAlert({
            title: 'Помилка!',
            description: 'Такий пароль вже був!',
            color: AlertColor.ERROR,
          }),
        );
      } else {
        dispatch(
          showAlert({
            title: 'Помилка!',
            description: 'Лист для верифікації сплив або неправильний код!',
            color: AlertColor.ERROR,
          }),
        );
        void push('/password-recovery/invalid');
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnMount
      validateOnChange
    >
      {({ isValid, errors }) => (
        <Form className={styles['form']}>
          <Input
            className={styles['input']}
            isSuccessOnDefault={true}
            label="Новий пароль"
            placeholder="user2000"
            size={InputSize.LARGE}
            type={InputType.PASSWORD}
            name="createPassword"
            defaultRemark="Не коротше 8 символів, мінімум одна літера та одна цифра"
          />
          <Input
            className={styles['input']}
            isSuccessOnDefault={true}
            label="Підтверди пароль"
            placeholder="input"
            size={InputSize.LARGE}
            type={InputType.PASSWORD}
            name="confirmPassword"
            disabled={errors.createPassword != null}
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
