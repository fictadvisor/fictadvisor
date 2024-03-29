import { FC } from 'react';
import { Radio as RadioMui, SxProps, Theme } from '@mui/material';

import { FieldState } from '@/components/common/ui/form/common/types';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from '../../radio/radio-button/Radio.styles';

interface FormikRadioProps {
  textType?: 'body1' | 'body2Medium';
  sx?: SxProps<Theme>;
  state?: FieldState;
  disabled?: boolean;
}

const FormikRadio: FC<FormikRadioProps> = ({
  disabled = false,
  state = FieldState.DEFAULT,
  sx = {},
  ...rest
}) => {
  return (
    <RadioMui
      sx={mergeSx(styles.radio(state), sx)}
      disableRipple
      disabled={disabled}
      {...rest}
    />
  );
};

export default FormikRadio;
