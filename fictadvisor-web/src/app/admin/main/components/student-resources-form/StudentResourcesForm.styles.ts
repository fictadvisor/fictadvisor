import { SxProps, Theme } from '@mui/material/styles';

export const resourcesWrapper: SxProps<Theme> = {
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  margin: '20px',
  paddingBottom: '30px',
};

export const miniInputsWrapper: SxProps<Theme> = {
  width: '80%',
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
};

export const miniInput: SxProps<Theme> = {
  width: '30%',
  borderRadius: '8px',
  marginTop: '15px',
  marginBottom: '15px',
};
