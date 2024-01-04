import React, { FC } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Form, Formik } from 'formik';

import { CustomCheck } from '@/components/common/icons/CustomCheck';
import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import Input from '@/components/common/ui/form/with-formik/input';
import { PersonalInfoForm } from '@/components/pages/account-page/components/general-tab/components/personal-info/types';
import { validationSchema } from '@/components/pages/account-page/components/general-tab/components/personal-info/validation';
import useAuthentication from '@/hooks/use-authentication';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import UserAPI from '@/lib/api/user/UserAPI';
import theme from '@/styles/theme';

import * as styles from './PersonalInfo.styles';

const objectsEqual = (obj1: object, obj2: object) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};
const PersonalInfoBlock: FC = () => {
  const { user, update } = useAuthentication();
  const { displayError } = useToastError();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktopSemiMedium'));

  const initialValues: PersonalInfoForm = {
    lastName: user.lastName,
    firstName: user.firstName,
    middleName: user.middleName,
  };

  const handleSubmit = async (data: PersonalInfoForm) => {
    data.firstName = data.firstName.trim().replace(/[`ʼ]/g, "'");
    data.middleName = data.middleName?.trim().replace(/[`ʼ]/g, "'");
    data.lastName = data.lastName.trim().replace(/[`ʼ]/g, "'");

    if (!data.middleName) delete data.middleName;

    try {
      await UserAPI.changeInfo(user.id, data);
      await update();
    } catch (error) {
      displayError(error);
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
          <Form>
            <Input sx={styles.input} label="Прізвище" name="lastName" />
            <Input sx={styles.input} label="Ім'я" name="firstName" />
            <Input sx={styles.input} label="По батькові" name="middleName" />
            <Box sx={styles.confirmButton}>
              <Button
                text="Зберегти зміни"
                startIcon={<CustomCheck />}
                size={isMobile ? ButtonSize.SMALL : ButtonSize.MEDIUM}
                type="submit"
                sx={isMobile ? styles.buttonPadding : {}}
                disabled={!isValid || objectsEqual(initialValues, values)}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PersonalInfoBlock;
