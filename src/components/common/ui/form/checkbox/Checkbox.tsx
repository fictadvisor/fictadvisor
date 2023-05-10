import { FC } from 'react';
import {
  Checkbox as CheckboxMui,
  FormControlLabel,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { useField } from 'formik';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import CheckedIcon from './components/CheckedIcon';
import Icon from './components/Icon';
import * as styles from './Checkbox.styles';

export type CheckboxColorType =
  | 'primary'
  | 'error'
  | 'lection'
  | 'practice'
  | 'laba'
  | 'event';

interface CheckboxProps {
  label?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  name: string;
  color?: CheckboxColorType;
  textType?: 'body1' | 'body2Medium';
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  disabled = false,
  sx,
  name,
  color = 'primary',
  textType = 'body1',
}) => {
  const [field, { touched, error }] = useField(name);
  color = touched && error ? 'error' : color;

  return (
    <FormControlLabel
      sx={mergeSx(styles.wrapper, sx)}
      disabled={disabled}
      control={
        <CheckboxMui
          {...field}
          name={name}
          checkedIcon={<CheckedIcon disabled={disabled} color={color} />}
          icon={<Icon disabled={disabled} color={color} />}
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
