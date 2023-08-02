import React from 'react';
import { FormControlLabel } from '@mui/material';
import { Field } from 'formik';

import FormikCheckbox from '@/components/common/ui/form/with-formik/checkbox';

export const CheckBox = ({
  name,
  label,
  onClick,
}: {
  name: string;
  label: string;
  onClick?: () => void;
}) => {
  return (
    <Field
      onClick={onClick}
      name={name}
      label={label}
      sx={{ gap: '8px', margin: '0' }}
      type="checkbox"
      as={FormControlLabel}
      control={<FormikCheckbox />}
    />
  );
};
