import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const button: SxProps<Theme> = {
  width: '200px',
  whiteSpace: 'nowrap',
  height: '36px',
  borderRadius: '6px',
  padding: '6px 12px 6px 12px',
  gap: '6px',
  typography: 'body1Bold',
};

export const dividerWrapper: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  alignItems: 'center',
  pb: '20px',
  typography: 'body1',
};

export const tag: SxProps<Theme> = {
  padding: '1px 3px',
};

export const iconButton = (isMobile: boolean) => ({
  transform: !isMobile ? 'scale(1.41)' : 'scale(1.15)',
  aspectRatio: '1/1',
  alignSelf: 'center',
  marginLeft: !isMobile ? '8px' : '0px',
  width: '34px',
  height: '34px',
  borderRadius: !isMobile ? '6px' : '4px',
  padding: '6px',
  gap: '10px',
});

export const iconButtonSeparated = (isMobile: boolean) => ({
  transform: !isMobile ? 'scale(1.41)' : 'scale(1)',
  aspectRatio: '1/1',
  alignSelf: 'right',
  marginLeft: '15px',
  width: '34px',
  height: '34px',
  border: '1px',
  borderRadius: '6px',
  borderColor: 'primary.500',
  padding: '6px',
  gap: '10px',
});
