import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const scheduleSection: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  margin: '6px',
  width: '75%',
  overflow: 'scroll',
  height: `calc(100vh - ${100}px)`,
  position: 'relative',
};

export const scheduleSectionMobile: SxProps<Theme> = {
  marginTop: '20px',
};

export const events: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
};

export const event: SxProps<Theme> = {
  display: 'flex',
};

export const eventDate: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  marginRight: '16px',
};

export const day: SxProps<Theme> = {
  fontSize: '14px',
  color: 'grey.500',
  textAlign: 'center',
};

export const date = (isCurDay: boolean): SxProps<Theme> => ({
  typography: 'h6',
  width: '36px',
  height: '36px',
  ...(isCurDay && {
    backgroundColor: 'primary.400',
    borderRadius: '50%',
  }),
  textAlign: 'center',
  lineHeight: '175%',
});

export const noEvents: SxProps<Theme> = {
  typography: 'body1',
  lineHeight: '400%',
};

export const skeleton: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  gap: '19px',
  marginBottom: '10px',
};
