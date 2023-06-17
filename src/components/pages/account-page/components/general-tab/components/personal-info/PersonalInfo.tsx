import React, { FC } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';

import { CustomCheck } from '@/components/common/icons/CustomCheck';
import { AlertColor } from '@/components/common/ui/alert';
import Button, { ButtonSize } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/form';
import { PersonalInfoForm } from '@/components/pages/account-page/components/general-tab/components/personal-info/types';
import { validationSchema } from '@/components/pages/account-page/components/general-tab/components/personal-info/validation';
import useAuthentication from '@/hooks/use-authentication';
import { UserAPI } from '@/lib/api/user/UserAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';

import styles from '../../GeneralTab.module.scss';

const PersonalInfoBlock: FC = () => {
  const { user, update } = useAuthentication();
  const initialValues: PersonalInfoForm = {
    lastName: user.lastName,
    firstName: user.firstName,
    middleName: user.middleName,
  };

  const dispatch = useDispatch();

  const handleSubmit = async (data: PersonalInfoForm) => {
    data.firstName = data.firstName.trim().replace('`', `'`).replace('ʼ', `'`);
    data.middleName = data.middleName
      ?.trim()
      .replace('`', `'`)
      .replace('ʼ', `'`);
    data.lastName = data.lastName.trim().replace('`', `'`).replace('ʼ', `'`);

    if (!data.middleName) delete data.middleName;

    try {
      await UserAPI.changeInfo(user.id, data);
      update();
    } catch (e) {
      dispatch(
        showAlert({
          title: 'Щось пішло не так, спробуй пізніше!',
          color: AlertColor.ERROR,
        }),
      );
    }
  };

  return (
    <>
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
              name="lastName"
            />
            <Input className={styles['input']} label="Ім'я" name="firstName" />
            <Input
              className={styles['input']}
              label="По батькові"
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
                text="Зберегти зміни"
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
