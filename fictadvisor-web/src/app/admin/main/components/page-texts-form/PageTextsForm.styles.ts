import { SxProps, Theme } from '@mui/material/styles';

export const inputsWrapper: SxProps<Theme> = {
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
  margin: '20px',
  paddingBottom: '30px',
};

export const miniInputsWrapper: SxProps<Theme> = {
  width: '80%',
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  marginTop: '20px',
};

export const resourcesTitle: SxProps<Theme> = {
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  margin: '20px',
};

export const textArea: SxProps<Theme> = {
  width: '65%',
  borderRadius: '8px',
};

export const input: SxProps<Theme> = {
  width: '65%',
  borderRadius: '8px',
  marginTop: '20px',
};

export const miniInput: SxProps<Theme> = {
  width: '30%',
  borderRadius: '8px',
};
export const mediumInput: SxProps<Theme> = {
  width: '40%',
  borderRadius: '8px',
};
