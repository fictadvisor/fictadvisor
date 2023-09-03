import { SxProps, Theme } from '@mui/material/styles';

export const layout: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: 'transparent',
  width: '1082px',
  height: '1354px',
  marginLeft: '27px',
  // overflow: 'hidden',
};

export const schedule: SxProps<Theme> = {
  position: 'relative',
  width: '1049px',
  height: '1344px',
  backgroundImage: 'url("/icons/schedule-page/grid-pattern.svg")',
};

export const columns: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row-reverse',
};

export const progress: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateY(-50%) translateX(-50%)',
};

// export const container: SxProps<Theme> = {
//   height: '80vh',
//   width: '100%',
//   overflow: 'scroll',
// };
