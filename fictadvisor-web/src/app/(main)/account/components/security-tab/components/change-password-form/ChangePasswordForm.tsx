'use client';
import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { Form, Formik } from 'formik';

import { changePasswordValidationSchema } from '@/app/(auth)/password-recovery/validation/changePasswordValidationSchema';
import { CustomCheck } from '@/components/common/icons/CustomCheck';
import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import CustomLink from '@/components/common/ui/custom-link';
import { CustomLinkType } from '@/components/common/ui/custom-link/types';
import { InputType } from '@/components/common/ui/form/input-mui/types';
import Input from '@/components/common/ui/form/with-formik/input';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import { setAuthTokens } from '@/lib/api/auth/ServerAuthApi';
import theme from '@/styles/theme';

import * as styles from './ChangePasswordForm.styles';
import { initialValues } from './constants';
import { ChangePasswordFormFields } from './types';

const ChangePasswordForm = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const toast = useToast();
  const { displayError } = useToastError();

  const handleSubmit = async (data: ChangePasswordFormFields) => {
    try {
      const tokens = await AuthAPI.changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      await setAuthTokens(tokens);
      toast.success('Пароль успішно змінено');
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={changePasswordValidationSchema}
      onSubmit={handleSubmit}
      validateOnMount
      validateOnChange
    >
      {({ isValid, errors, isSubmitting }) => (
        <Box sx={styles.formContainer}>
          <Form>
            <Input
              sx={styles.input}
              label="Поточний пароль"
              placeholder="введи свій пароль"
              type={InputType.PASSWORD}
              name="oldPassword"
              isSuccessOnDefault={true}
              showRemark={true}
            />
            {errors.oldPassword === 'Введений пароль недійсний' && (
              <Typography variant="body2">
                Забули пароль? Щоб відновити, перейдіть за{' '}
                <CustomLink
                  href="/password-recovery"
                  type={CustomLinkType.BLUE}
                  text="посиланням"
                />
              </Typography>
            )}
            <Input
              sx={styles.input}
              label="Новий пароль"
              placeholder="придумай новий пароль"
              type={InputType.PASSWORD}
              name="newPassword"
              disabled={!!errors.oldPassword}
              isSuccessOnDefault={true}
              showRemark={true}
            />
            <Input
              sx={styles.input}
              label="Підтвердження пароля"
              placeholder="підтвердь новий пароль"
              type={InputType.PASSWORD}
              name="confirmationPassword"
              disabled={!!errors.oldPassword || !!errors.newPassword}
              isSuccessOnDefault={true}
              showRemark={true}
            />
            <Box sx={styles.confirmButton}>
              <Button
                text="Оновити пароль"
                startIcon={<CustomCheck />}
                size={isMobile ? ButtonSize.SMALL : ButtonSize.MEDIUM}
                type="submit"
                disabled={!isValid || isSubmitting}
                sx={styles.changePasswordButton}
              />
            </Box>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
