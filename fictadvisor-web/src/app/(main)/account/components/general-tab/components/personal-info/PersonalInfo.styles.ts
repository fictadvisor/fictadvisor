import { SxProps, Theme } from '@mui/material/styles';

export const input: SxProps<Theme> = {
  marginBottom: { mobile: '22px', desktopSemiMedium: '24px' },
  marginTop: '1.5%',
};

export const confirmButton: SxProps<Theme> = {
  width: { mobile: 'fit-content', desktopSemiMedium: '50%' },
  margin: { mobile: '0 0 36px 0', desktopSemiMedium: '5px 0 36px 0' },
  display: { mobile: 'block', desktop: '' },
};

export const buttonPadding: SxProps<Theme> = {
  padding: '6px 12px',
};
