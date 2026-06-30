import { SxProps, Theme } from '@mui/material/styles';

import typography from '@/styles/theme/constants/typography';

export const popupContent: SxProps<Theme> = {
  ...typography.body1,
  padding: 0,
};
