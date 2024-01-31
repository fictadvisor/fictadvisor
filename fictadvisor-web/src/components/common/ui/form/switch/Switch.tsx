import { FC } from 'react';
import {
  FormControlLabel,
  Switch as MuiSwitch,
  SwitchProps as MUISwitchProps,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Switch.styles';
import { SwitchLabelPlacement } from './types';

interface SwitchProps extends Omit<MUISwitchProps, 'onChange'> {
  labelPlacement?: SwitchLabelPlacement;
  sx?: SxProps<Theme>;
  label?: string;
  onChange: (checked: boolean) => void;
}

const Switch: FC<SwitchProps> = ({
  labelPlacement = SwitchLabelPlacement.END,
  sx = {},
  label = '',
  onChange,
  ...props
}) => {
  return (
    <FormControlLabel
      sx={mergeSx(styles.wrapper, sx)}
      control={
        <MuiSwitch
          sx={styles.switchStyle}
          disableRipple
          onChange={event => onChange(event.target.checked)}
          {...props}
        />
      }
      label={
        <Typography sx={styles.label(label, labelPlacement)}>
          {label}
        </Typography>
      }
      labelPlacement={labelPlacement}
    />
  );
};
export default Switch;
