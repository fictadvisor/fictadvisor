import { FC } from 'react';
import {
  FormControlLabel,
  Switch as SwitchMui,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Switch.styles';

interface SwitchProps {
  labelPlacement?: 'start' | 'end';
  sx?: SxProps<Theme>;
  label?: string;
}

const Switch: FC<SwitchProps> = ({ labelPlacement = 'end', sx, label }) => {
  return (
    <FormControlLabel
      sx={mergeSx(styles.wrapper, sx)}
      control={<SwitchMui sx={styles.switchStyle} disableRipple />}
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
