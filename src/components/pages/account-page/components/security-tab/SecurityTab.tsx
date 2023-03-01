import React from 'react';
import { Form, Formik } from 'formik';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import { Input, InputSize, InputType } from '@/components/common/ui/form';
import { initialValues } from '@/components/pages/create-password-page/components/create-password-form/constants';
import { CreatePasswordFormFields } from '@/components/pages/create-password-page/components/create-password-form/types';
import { validationSchema } from '@/components/pages/create-password-page/components/create-password-form/validation';

import styles from './SecurityTab.module.scss';

const handleSubmit = (data: CreatePasswordFormFields) => {
  console.log({ data });
};

const changePassword = () => (
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
          label="Поточний пароль"
          placeholder="user2000"
          size={InputSize.LARGE}
          type={InputType.PASSWORD}
          name="Password"
        />
        <Input
          className={styles['input']}
          isSuccessOnDefault={true}
          label="Новий пароль"
          placeholder="user2000"
          size={InputSize.LARGE}
          type={InputType.PASSWORD}
          name="createPassword"
        />
        <Input
          className={styles['input']}
          isSuccessOnDefault={true}
          label="Підтвердження паролю"
          placeholder="user2000"
          size={InputSize.LARGE}
          type={InputType.PASSWORD}
          name="confirmPassword"
          disabled={errors.createPassword != null}
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

const getUserInformation = () => (
  // <Formik
  //   initialValues={initialValues}
  //   onSubmit={handleSubmit}
  //   validationSchema={validationSchema}
  //   validateOnMount
  //   validateOnChange
  // >
  //   <Form>
  //     <Input
  //       className={styles['input']}
  //       label="Юзернейм"
  //       placeholder="Taras1814"
  //       name="username"
  //     />
  //     <Input
  //       className={styles['input']}
  //       label="Пошта"
  //       placeholder="example@gmail.com"
  //     />
  //   </Form>
  // </Formik>
  <div></div>
);

const SecurityTab = () => {
  return (
    <div>
      <div className={styles['division']}>
        <h4 className={styles['division-text']}>Зміна паролю</h4>
        <div className={styles['white']}></div>
        <div className={styles['button']}></div>
      </div>
      <div className={styles['input-form']}>{changePassword()}</div>
      <div className={styles['division']}>
        <h4 className={styles['division-text']}>Юзернейм і пошта</h4>
        <div className={styles['white']}></div>
        <div className={styles['button']}></div>
      </div>
      <div className={styles['changePassword']}>{getUserInformation()}</div>
      <div className={styles['division']}>
        <div className={styles['white']}></div>
        <div className={styles['button']}></div>
      </div>
      <div className={styles['button-container']}>
        <Button
          text={'Вийти з акаунту'}
          variant={ButtonVariant.FILLED}
          color={ButtonColor.SECONDARY}
          size={ButtonSize.MEDIUM}
        />
      </div>
      <div className={styles['button-container-mobile']}>
        <Button
          text={'Вийти з акаунту'}
          variant={ButtonVariant.FILLED}
          color={ButtonColor.SECONDARY}
          size={ButtonSize.SMALL}
        />
      </div>
    </div>
  );
};

export default SecurityTab;
