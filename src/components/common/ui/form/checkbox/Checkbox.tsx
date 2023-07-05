import { FC } from 'react';
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useField } from 'formik';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import CheckedIcon from './components/CheckedIcon';
import Icon from './components/Icon';
import * as styles from './Checkbox.styles';
import { CheckboxColor, CheckboxTextType } from './types';

interface CheckboxProps {
  label?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  name: string;
  color?: CheckboxColor;
  textType?: CheckboxTextType;
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  disabled = false,
  sx = {},
  name,
  color = CheckboxColor.PRIMARY,
  textType = CheckboxTextType.BODY1,
}) => {
  const [field, { touched, error }] = useField(name);
  const checkboxColor = touched && error ? CheckboxColor.ERROR : color;

  return (
    <FormControlLabel
      sx={mergeSx(styles.wrapper, sx)}
      disabled={disabled}
      control={
        <MuiCheckbox
          {...field}
          name={name}
          checkedIcon={
            <CheckedIcon disabled={disabled} color={checkboxColor} />
          }
          icon={<Icon disabled={disabled} color={checkboxColor} />}
          disableRipple
          sx={styles.checkBox}
        />
      }
      label={
        <Typography variant={textType} sx={styles.label(disabled, label)}>
          {label}
        </Typography>
      }
    />
  );
};

export default Checkbox;
