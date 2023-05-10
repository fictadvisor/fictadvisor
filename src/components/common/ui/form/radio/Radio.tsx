import { FC } from 'react';
import {
  FormControlLabel,
  Radio as RadioMui,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { useField } from 'formik';

import { FieldState } from '@/components/common/ui/form/common/types';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Radio.styles';

interface RadioProps {
  value: string;
  label: string;
  textType?: 'body1' | 'body2Medium';
  sx?: SxProps<Theme>;
  disabled?: boolean;
  name: string;
}

const Radio: FC<RadioProps> = ({
  value,
  label,
  textType = 'body1',
  sx,
  disabled = false,
  name,
  ...props
}) => {
  const [field, { touched, error }] = useField(name);
  const state = touched && error ? FieldState.ERROR : FieldState.DEFAULT;

  return (
    <FormControlLabel
      sx={mergeSx(styles.wrapper, sx)}
      value={value}
      control={
        <RadioMui
          value={value}
          sx={styles.radio(state)}
          disableRipple
          disabled={disabled}
          {...props}
        />
      }
      label={
        <Typography sx={styles.label(disabled, label)} variant={textType}>
          {label}
        </Typography>
      }
    />
  );
};

export default Radio;
