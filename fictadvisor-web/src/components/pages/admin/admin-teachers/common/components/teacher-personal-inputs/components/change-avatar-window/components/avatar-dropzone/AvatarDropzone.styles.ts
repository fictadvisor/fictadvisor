import { SxProps, Theme } from '@mui/material/styles';

export const wrapper = (isDragging: boolean): SxProps<Theme> => ({
  display: 'flex',
  width: {
    mobile: '375px',
    tablet: '463px',
  },
  height: '259px',
  marginTop: '15px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '6px',
  flexShrink: 0,
  ...(isDragging && {
    backgroundColor: 'backgroundDark.50',
  }),
  ...(!isDragging && {
    backgroundColor: 'backgroundDark.200',
  }),
  borderRadius: '4px',
  border: '2px dashed',
  borderColor: 'backgroundDark.600',

  svg: {
    width: '32.5px',
    height: '32.5px',
  },
});

export const input = {
  display: 'none',
};

export const button: SxProps<Theme> = {
  borderRadius: '8px',
  typography: 'buttonBold',
  width: '176px',
};
