import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '320px',
  position: 'relative',
};
export const content = (imgSrc?: string): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  borderRadius: '12px',
  background: '#151515',
  alignItems: 'flex-start',
  mt: imgSrc ? '45px' : '0',
  padding: imgSrc ? '70px 20px 20px 20px' : '16px',
});
