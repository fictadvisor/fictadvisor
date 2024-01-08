import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const button: SxProps<Theme> = {
  width: { mobile: 'min-content' },
  whiteSpace: 'nowrap',
};

export const dividerWrapper: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '18px',
  alignItems: 'center',
  pb: '20px',
  typography: 'body1',
};

export const tag: SxProps<Theme> = {
  padding: '1px 3px',
};

export const iconButton = (isMobile: boolean) => ({
  transform: !isMobile ? 'scale(1.41)' : 'scale(1)',
  aspectRatio: '1/1',
  alignSelf: 'center',
});
