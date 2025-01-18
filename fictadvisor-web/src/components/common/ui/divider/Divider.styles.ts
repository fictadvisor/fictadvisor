import { SxProps, Theme } from '@mui/material/styles';

export const divider: SxProps<Theme> = {
  borderTopWidth: 1,
  borderBottomWidth: 0,
  borderColor: 'grey.800',

  '&.MuiDivider-withChildren': {
    borderTopWidth: 0,
    '&::before,&::after': {
      width: '100%',
      borderTopWidth: 1,
      borderColor: 'grey.800',
    },
  },
  '&.MuiDivider-textAlignLeft': {
    '&::before': {
      display: 'none',
    },
    span: {
      padding: '0px 8px 0px 0px',
    },
  },
  '&.MuiDivider-textAlignRight': {
    '&::after': {
      display: 'none',
    },
    span: {
      padding: '0px 0px 0px 8px',
    },
  },
};
