import { SxProps, Theme } from '@mui/material/styles';

export const divider: SxProps<Theme> = {
  borderTopWidth: 1,
  borderBottom: 'transparent',
  borderColor: 'grey.800',

  '&.MuiDivider-textAlignLeft': {
    '&::before': {
      display: 'none',
    },
    '&::after': {
      width: '100%',
      borderWidth: 1,
    },
    span: {
      padding: '0px 8px 0px 0px',
    },
  },
  '&.MuiDivider-textAlignRight': {
    '&::before': {
      borderWidth: 1,
      width: '100%',
    },
    '&::after': {
      display: 'none',
      border: 'none',
    },
    span: {
      padding: '0px 0px 0px 8px',
    },
  },
  '&::before': {
    borderWidth: 1,
    borderColor: 'grey.800',
  },
  '&::after': {
    borderWidth: 1,
    borderColor: 'grey.800',
  },
  span: {
    padding: '0px 8px',
  },
};
