import React, { FC } from 'react';
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { CheckboxProps as MuiCheckboxProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import CheckedIcon from './components/CheckedIcon';
import Icon from './components/Icon';
import * as styles from './Checkbox.styles';
import { CheckboxColor, CheckboxTextType } from './types';

export interface CheckboxProps
  extends Omit<MuiCheckboxProps, 'color' | 'checkedIcon' | 'disabled'> {
  label?: string;
  sx?: SxProps<Theme>;
  color?: CheckboxColor;
  textType?: CheckboxTextType;
  touched?: boolean;
  error?: string;
  disabled?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  sx = {},
  color = CheckboxColor.PRIMARY,
  textType = CheckboxTextType.BODY1,
  touched = false,
  error,
  disabled = false,
  ...rest
}) => {
  const checkboxColor = touched && error ? CheckboxColor.ERROR : color;

  return (
    <FormControlLabel
      sx={mergeSx(styles.wrapper, sx)}
      disabled={disabled}
      control={
        <MuiCheckbox
          {...rest}
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
