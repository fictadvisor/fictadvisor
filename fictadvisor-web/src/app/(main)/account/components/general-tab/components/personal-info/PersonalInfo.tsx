import React, { FC } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Form, Formik } from 'formik';

import { PersonalInfoForm } from '@/app/(main)/account/components/general-tab/components/personal-info/types';
import { validationSchema } from '@/app/(main)/account/components/general-tab/components/personal-info/validation';
import { CustomCheck } from '@/components/common/icons/CustomCheck';
import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import Input from '@/components/common/ui/form/with-formik/input';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import UserAPI from '@/lib/api/user/UserAPI';
import theme from '@/styles/theme';

import * as styles from './PersonalInfo.styles';

const PersonalInfoBlock: FC = () => {
  const { user: userNotNull } = useAuthentication();
  const user = userNotNull!;
  const { displayError } = useToastError();
  const { success } = useToast();

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
      success('Інформацію успішно змінено');
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
        {({ isValid, dirty, isSubmitting }) => (
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
                disabled={!isValid || !dirty || isSubmitting}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PersonalInfoBlock;
