import { SxProps, Theme } from '@mui/material';

export const container = {
  width: { mobile: '100%', tablet: '528px' },
  padding: '36px 36px 36px 28px',
  boxShadow: '0px 4px 50px 10px rgba(0, 0, 0, 0.25)',
  position: 'fixed',
  zIndex: 11,
  backgroundColor: 'backgroundDark.100',
  top: '64px',
  right: '0',
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '16px',
  '.MuiTypography-root': {
    wordWrap: 'break-word',
  },
  '& a': { width: 'fit-content' },
};

export const titleContainer: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& p.MuiTypography-root': {
    maxWidth: 'calc(100% - 90px)',
  },
};

export const content: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '96px auto',
  alignItems: 'center',
  gap: '8px',
};
export const teachersContainer: SxProps<Theme> = {
  display: 'flex',
  flexFlow: 'column nowrap',
};

export const infoContainer: SxProps<Theme> = {
  marginTop: '12px',
  '& .MuiTabs-flexContainer': {
    gap: '8px',
  },

  '& button': {
    p: '8px 16px',
    width: 'fit-content',
    height: 'fit-content',
  },
};
