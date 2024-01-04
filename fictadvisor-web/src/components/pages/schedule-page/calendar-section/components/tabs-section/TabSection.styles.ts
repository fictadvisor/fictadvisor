import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const tabList: SxProps<Theme> = {};

export const tabBox: SxProps<Theme> = {
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center',
  gap: '16px',
  '& .MuiTabs-root': {
    minHeight: 'fit-content',
  },
  width: '100%',
  '& .MuiTabs-flexContainer': { justifyContent: 'center' },
  '& .MuiButtonBase-root.MuiTab-root': {
    width: 'fit-content',
  },
  '& .MuiTabPanel-root': {
    p: 0,
  },
};
