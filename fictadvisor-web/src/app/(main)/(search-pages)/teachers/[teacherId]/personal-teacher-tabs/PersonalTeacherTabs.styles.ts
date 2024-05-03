import { SxProps, Theme } from '@mui/material/styles';

export const tabList: SxProps<Theme> = {
  '.MuiTabs-flexContainer': {
    gap: '8px',
    overflow: 'scroll',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0',
      height: '0',
    },
    '.MuiTab-root': {
      zIndex: '1',
    },
  },
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

export const tabListWrapper: SxProps<Theme> = {
  paddingTop: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: { mobile: 'column-reverse', tablet: 'row' },
  alignItems: { mobile: 'start', tablet: 'center' },
  gap: '16px',
};

export const tabPanelList: SxProps<Theme> = {
  padding: {
    mobile: '20px 0 38px',
    desktop: '24px 0 50px',
  },
};
