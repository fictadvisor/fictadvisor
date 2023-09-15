import theme from '@/styles/theme';

import { CheckboxColor } from '../types';

export const ControlsColorMap: Record<CheckboxColor, string> = {
  [CheckboxColor.PRIMARY]: theme.palette.grey[800],
  [CheckboxColor.ERROR]: theme.palette.error[500],
  [CheckboxColor.LECTURE]: theme.palette.indigo[700],
  [CheckboxColor.PRACTICE]: theme.palette.orange[600],
  [CheckboxColor.LAB]: theme.palette.mint[600],
  [CheckboxColor.EVENT]: theme.palette.violet[700],
};
