import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Form, Formik } from 'formik';

import { TelegramOutlineIcon } from '@/components/common/custom-svg/TelegramOutline';
import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import { Input, InputSize, InputType } from '@/components/common/ui/form';
import { initialValues } from '@/components/pages/create-password-page/components/create-password-form/constants';
import { CreatePasswordFormFields } from '@/components/pages/create-password-page/components/create-password-form/types';
import { validationSchema } from '@/components/pages/create-password-page/components/create-password-form/validation';

import styles from './GeneralTab.module.scss';

const handleSubmit = (data: CreatePasswordFormFields) => {
  console.log({ data });
};
const GeneralTab = () => (
  <div className={styles['container']}>
    <div className={styles['personal-info']}>
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
                text="Зберігти зміни"
                startIcon={<CheckIcon className={'icon'} />}
                size={ButtonSize.MEDIUM}
                type="submit"
                disabled={!isValid}
                className={styles['change-password-button']}
              />
            </div>
            <div className={styles['confirm-button-mobile']}>
              <Button
                text="Зберігти зміни"
                startIcon={<CheckIcon className={'icon'} />}
                size={ButtonSize.SMALL}
                type="submit"
                disabled={!isValid}
                className={styles['change-password-button']}
              />
            </div>
          </Form>
        )}
      </Formik>
      <div className={styles['division']}>
        <h4 className={styles['division-text']}>Посилання на соц. мережі</h4>
        <div className={styles['white']}></div>
        <div className={styles['button']}></div>
      </div>
      <div className={styles['confirm-button']}>
        <Button
          text="Додати посилання"
          startIcon={<PlusIcon className={'icon'} />}
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.OUTLINE}
          type="submit"
          className={styles['change-password-button']}
        />
      </div>
      <div className={styles['confirm-button-mobile']}>
        <Button
          text="Додати посилання"
          startIcon={<PlusIcon className={'icon'} />}
          size={ButtonSize.SMALL}
          variant={ButtonVariant.OUTLINE}
          type="submit"
          className={styles['change-password-button']}
        />
      </div>
    </div>
    <div className={styles['avatar-and-telegram-info']}>
      <div className={styles['avatar']}>
        <img src={'./assets/default-avatar.jpg'} alt={'avatar'} />
      </div>
      <Button
        className={styles['telegram-button']}
        text={"Під'єднати телеграм"}
        size={ButtonSize.MEDIUM}
        startIcon={<TelegramOutlineIcon />}
        variant={ButtonVariant.OUTLINE}
      />
      <Button
        className={styles['telegram-button-mobile']}
        text={"Під'єднати телеграм"}
        size={ButtonSize.SMALL}
        startIcon={<TelegramOutlineIcon />}
        variant={ButtonVariant.OUTLINE}
      />
    </div>
  </div>
);

export default GeneralTab;
