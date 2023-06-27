import { SxProps, Theme } from '@mui/material/styles';

import palette from '@/styles/theme/constants/pallete';

export const card: SxProps<Theme> = {
  position: 'sticky',
  top: '88px',
  border: `1px solid ${palette.grey['200']}`,
  boxShadow:
    '1px 1px 3px rgba(10, 10, 10, 0.09), 2px 4px 16px rgba(13, 13, 13, 0.13)',
  borderRadius: '4px',
  backgroundColor: 'backgroundDark',
  display: {
    mobile: 'none',
    desktopMedium: 'flex',
  },
  flexDirection: 'column',
  gap: '20px',
  p: '32px',
  minWidth: '524px',
  width: '524px',
  height: 'fit-content',
};

export const top: SxProps<Theme> = {
  display: 'flex',
  gap: '32px',
};

export const info: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
};

export const image: SxProps<Theme> = {
  height: '160px',
  width: '160px',
  objectFit: 'cover',
  borderRadius: '50%',
};

export const title: SxProps<Theme> = {
  fontSize: '24px',
};

export const subject: SxProps<Theme> = {
  fontSize: '24px',
};

/*.subject{
  display: flex;
  min-width: unset;
  width: 100%;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  flex-direction: column;
  align-items: flex-start;
  overflow-wrap: anywhere;
  padding-right: 42px;
  h5{
  @include h5--bold;
  }
  padding-bottom: 18px;
  padding-top: 21px;
}*/

export const rating: SxProps<Theme> = {
  marginTop: '10px',
};

export const tags: SxProps<Theme> = {
  display: 'flex',
  marginTop: '25px',
  gap: '8px',
};

export const contacts: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
};
