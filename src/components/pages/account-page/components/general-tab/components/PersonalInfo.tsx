import React from 'react';
import { FC } from 'react';
import { Form, Formik } from 'formik';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import Button, { ButtonSize } from '@/components/common/ui/button';
import { Input, InputSize } from '@/components/common/ui/form';
import { PersonalInfoForm } from '@/components/pages/account-page/components/general-tab/components/types';
import { validationSchema } from '@/components/pages/account-page/components/general-tab/components/validation';
import { UserAPI } from '@/lib/api/user/UserAPI';

import styles from '../GeneralTab.module.scss';

interface PersonalInfoProps {
  user;
  update;
}

const PersonalInfoBlock: FC<PersonalInfoProps> = ({ user, update }) => {
  const initialValues: PersonalInfoForm = {
    lastName: user.lastName,
    firstName: user.firstName,
    middleName: user.middleName,
  };

  const handleSubmit = async (data: PersonalInfoForm) => {
    await UserAPI.changeInfo(user.id, data);
    update();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, values, initialValues }) => (
        <Form className={styles['form']}>
          <Input
            className={styles['input']}
            label="Прізвище"
            size={InputSize.LARGE}
            name="lastName"
          />
          <Input
            className={styles['input']}
            label="Ім'я"
            size={InputSize.LARGE}
            name="firstName"
          />
          <Input
            className={styles['input']}
            label="По батькові"
            size={InputSize.LARGE}
            name="middleName"
          />
          <div className={styles['confirm-button']}>
            <Button
              text="Зберігти зміни"
              startIcon={<CustomCheck />}
              size={ButtonSize.MEDIUM}
              type="submit"
              disabled={!isValid || initialValues === values}
              className={styles['change-password-button']}
            />
          </div>
          <div className={styles['confirm-button-mobile']}>
            <Button
              text="Зберігти зміни"
              startIcon={<CustomCheck />}
              size={ButtonSize.SMALL}
              type="submit"
              disabled={!isValid || initialValues === values}
              className={styles['change-password-button']}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalInfoBlock;
