import theme from '@/styles/theme';

import { CheckboxColorType } from '../Checkbox';

export const ControlsColorMap: Record<CheckboxColorType, string> = {
  primary: theme.palette.grey[800],
  error: theme.palette.error[500],
  lection: theme.palette.violet[600],
  practice: theme.palette.orange[600],
  laba: theme.palette.mint[600],
  event: theme.palette.indigo[800],
};
