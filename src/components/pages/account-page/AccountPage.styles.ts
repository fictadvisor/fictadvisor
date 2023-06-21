import { SxProps, Theme } from '@mui/material/styles';

export const tabContext: SxProps<Theme> = {
  display: 'flex',
  padding: {
    mobile: '0 16px',
    desktopSemiMedium: '0 50px',
  },
  width: '100%',
};

export const tabList: SxProps<Theme> = {
  display: {
    mobile: 'none',
    desktopSemiMedium: 'flex',
  },
  '.MuiTabs-flexContainer': {
    flexDirection: 'column',
    gap: '6px',
  },
  maxWidth: '200px',
  width: '100%',
  marginRight: '46px',
};

export const tabPanelsList: SxProps<Theme> = {
  marginTop: '8px',
  width: '100%',
};

export const tabPanel: SxProps<Theme> = {
  width: '100%',
  padding: '0',
};
