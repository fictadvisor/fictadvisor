import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const dropdown: SxProps<Theme> = {
  width: '165px',
  backgroundColor: 'backgroundDark.100',
  boxShadow: '3px 1px 3px hsla(0,0%,4%,.09), 2px 4px 16px hsla(0,0%,5%,.13);',
  borderRadius: '5px',
  '& svg': {
    height: '18px',
    width: '18px',
  },
  '& .MuiButtonBase-root': {
    justifyContent: 'flex-start',
    typography: 'body1',
  },
};
