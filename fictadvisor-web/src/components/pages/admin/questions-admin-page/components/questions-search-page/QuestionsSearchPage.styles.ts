import { SxProps, Theme } from '@mui/material/styles';

export const header: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
};

export const form: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '6px',
};

export const input: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    width: '344px',
    height: '46px',
  },
};

export const divider: SxProps<Theme> = {
  borderColor: 'backgroundDark.600',
  height: '46px',
};

export const button: SxProps<Theme> = {
  width: '136px',
  height: '48px',
  borderRadius: '8px',
};
