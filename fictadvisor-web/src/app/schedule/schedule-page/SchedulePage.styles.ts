import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const schedulePage: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { mobile: 'column', tablet: 'row' },
  alignItems: { mobile: 'stretch', tablet: 'center' },
  pl: { mobile: '10%', tablet: 'unset' },
  pr: { mobile: '10%', tablet: 'unset' },
  justifyContent: 'space-between',

  width: '100%',
  mt: '16px',
  mb: '74px',
  ml: '16px',
  mr: '16px',
};
