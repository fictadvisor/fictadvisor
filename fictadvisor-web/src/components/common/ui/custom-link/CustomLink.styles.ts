import { SxProps, Theme } from '@mui/material/styles';

import { CustomLinkType } from '@/components/common/ui/custom-link/types';
import theme from '@/styles/theme';

export const CustomLinkStyles = (type: CustomLinkType): SxProps<Theme> => ({
  typography: {
    mobile: 'body1',
    desktopSemiMedium: 'body1',
  },
  ...(type === CustomLinkType.WHITE && {
    color: theme.palette.grey[800],
    textDecorationColor: theme.palette.grey[800],
    '&:visited': {
      color: theme.palette.grey[700],
      textDecorationColor: theme.palette.grey[700],
    },
    '&:hover': {
      color: theme.palette.white,
      textDecorationColor: theme.palette.white,
    },
    '&:active': {
      color: theme.palette.white,
      textDecorationColor: theme.palette.white,
    },
  }),
  ...(type === CustomLinkType.BLUE && {
    color: theme.palette.info[400],
    textDecorationColor: theme.palette.info[400],
    '&:visited': {
      color: theme.palette.info[200],
      textDecorationColor: theme.palette.info[200],
    },
    '&:hover': {
      color: theme.palette.info[500],
      textDecorationColor: theme.palette.info[500],
    },
    '&:active': {
      color: theme.palette.info[700],
      textDecorationColor: theme.palette.info[700],
    },
  }),
});
