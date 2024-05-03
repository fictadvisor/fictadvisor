import { SxProps, Theme } from '@mui/material/styles';

export const confirmButton: SxProps<Theme> = {
  width: { mobile: 'fit-content', desktopSemiMedium: '262px' },
  margin: { mobile: '0 0 36px 0', desktopSemiMedium: '5px 0 36px 0' },
  display: { mobile: 'block', desktop: '' },
};

export const contactItemContainer: SxProps<Theme> = {
  width: '100%',
  height: 'fit-content',
};

export const contactItem: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '2.5%',
  marginBottom: '26px',
  a: {
    flexGrow: 1,
  },
  '& button': {
    marginTop: '10px',
  },
};
