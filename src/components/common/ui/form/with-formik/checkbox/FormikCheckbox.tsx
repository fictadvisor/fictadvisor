import React, { FC } from 'react';
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
  color?: CheckboxColor;
  textType?: CheckboxTextType;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormikCheckbox: FC<CheckboxProps> = ({
  disabled = false,
  sx = {},
  onChange,
  color = CheckboxColor.PRIMARY,
  textType = CheckboxTextType.BODY1,
  ...rest
}) => {
  return (
    <MuiCheckbox
      onChange={onChange}
      checkedIcon={<CheckedIcon disabled={disabled} color={color} />}
      icon={<Icon disabled={disabled} color={color} />}
      disableRipple
      sx={mergeSx(styles.checkBox, sx)}
      {...rest}
    />
  );
};

export default FormikCheckbox;
