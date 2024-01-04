import { FC } from 'react';
import {
  FormControlLabel,
  Switch as MuiSwitch,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Switch.styles';
import { SwitchLabelPlacement } from './types';

interface SwitchProps {
  labelPlacement?: SwitchLabelPlacement;
  sx?: SxProps<Theme>;
  label?: string;
}
const Switch: FC<SwitchProps> = ({
  labelPlacement = SwitchLabelPlacement.END,
  sx = {},
  label = '',
}) => {
  return (
    <FormControlLabel
      sx={mergeSx(styles.wrapper, sx)}
      control={<MuiSwitch sx={styles.switchStyle} disableRipple />}
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
