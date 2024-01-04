import { FC } from 'react';
import { Box } from '@mui/material';
import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';
import { useField } from 'formik';

import Checkbox from '@/components/common/ui/form/checkbox';
import { CheckboxProps } from '@/components/common/ui/form/checkbox/Checkbox';

export interface FormikCheckboxProps extends CheckboxProps {
  name: string;
}

const errorMessage: SxProps<Theme> = {
  color: 'error.400',
  fontSize: '11px',
};
const FormikCheckbox: FC<FormikCheckboxProps> = ({ name, ...rest }) => {
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);

  return (
    <Box>
      <Checkbox
        {...rest}
        name={name}
        checked={value}
        touched={touched}
        error={error}
        onChange={(event, checked) => {
          setTouched(true);
          setValue(checked);
          if (rest.onChange) rest.onChange(event, checked);
        }}
      />
      {touched && error && <Box sx={errorMessage}>{error}</Box>}
    </Box>
  );
};

export default FormikCheckbox;
