import React from 'react';
import { Box, FormControlLabel } from '@mui/material';
import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';
import { Field, useField } from 'formik';

import FormikCheckbox from '@/components/common/ui/form/with-formik/checkbox';
import { CheckboxProps } from '@/components/common/ui/form/with-formik/checkbox/FormikCheckbox';

const errorMessage: SxProps<Theme> = {
  color: 'error.400',
  fontSize: '11px',
};
interface CheckBoxProps extends CheckboxProps {
  name: string;
  label: string;
  onClick?: () => void;
}
export const CheckBox = ({ name, label, onClick, ...rest }: CheckBoxProps) => {
  const [field, { touched, error }, {}] = useField(name);

  return (
    <Box>
      <Field
        name={name}
        onClick={onClick}
        label={label}
        sx={{ gap: '8px', margin: '0' }}
        type="checkbox"
        as={FormControlLabel}
        control={<FormikCheckbox {...rest} {...field} />}
      />
      {touched && error && <Box sx={errorMessage}>{error}</Box>}
    </Box>
  );
};
