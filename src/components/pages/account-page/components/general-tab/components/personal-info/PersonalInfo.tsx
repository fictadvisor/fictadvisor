import React, { FC, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { Form, Formik } from 'formik';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import { AlertColor } from '@/components/common/ui/alert';
import AlertPopup from '@/components/common/ui/alert-popup';
import Button, { ButtonSize } from '@/components/common/ui/button';
import { Input, InputSize } from '@/components/common/ui/form';
import { PersonalInfoForm } from '@/components/pages/account-page/components/general-tab/components/personal-info/types';
import { validationSchema } from '@/components/pages/account-page/components/general-tab/components/personal-info/validation';
import useAuthentication from '@/hooks/use-authentication';
import { UserAPI } from '@/lib/api/user/UserAPI';

import styles from '../../GeneralTab.module.scss';

const PersonalInfoBlock: FC = () => {
  const { user, update } = useAuthentication();
  const initialValues: PersonalInfoForm = {
    lastName: user.lastName,
    firstName: user.firstName,
    middleName: user.middleName,
  };

  const [isUpdated, setIsUpdated] = useState(false);

  const handleSubmit = async (data: PersonalInfoForm) => {
    console.log(initialValues, data);
    await UserAPI.changeInfo(user.id, data);
    update();
  };

  return (
    <>
      {isUpdated && (
        <AlertPopup
          title="Вітаємо!"
          description="Ваші дані успішно збережено"
          color={AlertColor.SUCCESS}
        />
      )}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid, values }) => (
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
                text="Зберегти зміни"
                startIcon={<CustomCheck />}
                size={ButtonSize.MEDIUM}
                type="submit"
                disabled={!isValid || shallowEqual(initialValues, values)}
                className={styles['change-password-button']}
              />
            </div>
            <div className={styles['confirm-button-mobile']}>
              <Button
                text="Зберігти зміни"
                startIcon={<CustomCheck />}
                size={ButtonSize.SMALL}
                type="submit"
                disabled={!isValid || shallowEqual(initialValues, values)}
                className={styles['change-password-button']}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PersonalInfoBlock;
