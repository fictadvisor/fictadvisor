import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  position: 'sticky',
  top: '-1px',
  backgroundColor: 'backgroundDark.100',
  zIndex: '2',
  width: '1140px',
};

export const date: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  gap: '12px',
  paddingLeft: '71px',
};

export const month: SxProps<Theme> = {
  typography: { mobile: 'h6Bold', tablet: 'h4Medium' },
};

export const week: SxProps<Theme> = {
  typography: 'body1Bold',
};

export const weekWrapper: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
};

export const button: SxProps<Theme> = {
  padding: '6px',
};

export const columns: SxProps<Theme> = {
  marginLeft: '71px',
  marginTop: '27px',
  marginBottom: '6px',
  display: 'flex',
  flexDirection: 'row',
  width: '1049px',
};

export const column: SxProps<Theme> = {
  display: 'flex',
  width: '148px',
  height: '26px',
  textAlign: 'center',
  typography: 'h6Medium',
  padding: '0 8px',
};

export const dayNumber = (isCurDay: boolean): SxProps<Theme> => ({
  height: '26px',
  borderRadius: '6px',
  padding: '3px 4px',
  color: 'grey.500',
  ...(isCurDay && {
    backgroundColor: 'primary.400',
    color: 'white',
  }),
});

export const dayName = (isCurDay: boolean): SxProps<Theme> => ({
  height: '26px',
  color: 'grey.500',
  borderRadius: '6px',
  padding: '3px 4px',
  ...(isCurDay && {
    color: 'white',
  }),
});
