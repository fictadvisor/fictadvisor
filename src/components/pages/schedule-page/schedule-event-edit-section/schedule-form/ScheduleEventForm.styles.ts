import { SxProps, Theme } from '@mui/material';

export const container: SxProps<Theme> = {
  width: { mobile: '100%', tablet: '528px' },
  padding: '36px 36px 36px 28px',
  boxShadow: '0px 4px 50px 10px rgba(0, 0, 0, 0.25)',
  position: 'fixed',
  zIndex: 11,
  backgroundColor: 'backgroundDark.100',
  top: '64px',
  right: '0',
  maxHeight: 'calc(100% - 64px)',
  overflowY: 'scroll',
};

export const titleContainer: SxProps<Theme> = {
  display: 'flex',
  gap: '16px',
  justifyContent: 'space-between',
  alignItems: 'center',
};
export const scrollable: SxProps<Theme> = {
  overflowY: 'scroll',
};
export const content: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '94px auto',
  alignItems: 'center',
  gap: '8px',
  mt: '16px',
};

export const infoContainer: SxProps<Theme> = {
  mt: '20px',
  '& .MuiTabs-flexContainer': {
    gap: '8px',
  },
  '& .MuiTabs-root': {
    minHeight: 'unset',
  },

  '& button': {
    p: '8px 16px',
    width: 'fit-content',
    height: 'fit-content',
  },
};

export const buttonContainer = (isNewEvent: boolean): SxProps<Theme> => ({
  mt: '16px',
  display: 'flex',
  justifyContent: isNewEvent ? 'flex-end' : 'space-between',
});

export const timeInputs: SxProps<Theme> = {
  display: 'flex',
  gap: '8px',
  flexWrap: { mobile: 'wrap', mobileMedium: 'nowrap' },
};

export const btn: SxProps<Theme> = {
  width: 'fit-content',
  // p: '6px',
};
