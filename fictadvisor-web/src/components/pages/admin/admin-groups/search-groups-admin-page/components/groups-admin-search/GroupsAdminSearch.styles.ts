import { SxProps, Theme } from '@mui/material/styles';

export const header: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  mb: '20px',
};

export const form: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '12px',
};

export const input: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    width: '344px',
    height: '46px',
  },
};

export const divider: SxProps<Theme> = {
  marginX: '-4px',
  borderColor: 'backgroundDark.600',
  height: '46px',
};

export const button: SxProps<Theme> = {
  width: '135px',
  height: '48px',
  borderRadius: '8px',
};

export const course: SxProps<Theme> = {
  width: '98px',
  flex: '0 0 98px',
};

export const specialty: SxProps<Theme> = {
  width: '150px',
};

export const cathedra: SxProps<Theme> = {
  width: '112px',
};

export const sortBy: SxProps<Theme> = {
  width: '195px',
};
