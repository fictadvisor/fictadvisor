import { SxProps, Theme } from '@mui/material/styles';

export const breadcrumb: SxProps<Theme> = {
  width: '95%',
  height: '36px',
  marginBottom: '32px',
  padding: {
    mobile: '16px 16px 16px 0px',
    desktopSemiMedium: '16px',
  },
};

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
  width: {
    desktop: '100%',
    mobile: '100%',
    desktopSemiMedium: 'calc(100% - 250px)',
  },
};

export const tabPanel: SxProps<Theme> = {
  width: '100%',
  padding: '0',
};
