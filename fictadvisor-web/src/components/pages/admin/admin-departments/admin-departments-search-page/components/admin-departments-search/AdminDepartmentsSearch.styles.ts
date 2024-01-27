import { SxProps, Theme } from '@mui/material/styles';

export const filterBar: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '5px',
};

export const header: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
};

export const button: SxProps<Theme> = {
  width: '135px',
  height: '48px',
  borderRadius: '8px',
};

export const input: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    width: '344px',
    height: '46px',
  },
};

export const dropdown: SxProps<Theme> = {
  width: '150px',
};

export const divider: SxProps<Theme> = {
  marginX: '4px',
  borderColor: 'backgroundDark.600',
  height: '46px',
};
