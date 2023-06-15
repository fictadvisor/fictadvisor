import { SxProps, Theme } from '@mui/material/styles';

export const tabList: SxProps<Theme> = {
  paddingTop: '24px',
  '.MuiTabs-flexContainer': {
    gap: '8px',
    overflow: 'scroll',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0',
      height: '0',
    },
  },
  width: '100%',
};

export const tabPanelList: SxProps<Theme> = {
  padding: {
    mobile: '20px 0 38px',
    desktop: '24px 0 50px',
  },
};
