import { SxProps, Theme } from '@mui/material/styles';

export const inputsWrapper: SxProps<Theme> = {
  width: '100%',
  maxWidth: '308px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
  ':last-child': {
    marginTop: '12px',
  },
};
