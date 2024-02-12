import { SxProps, Theme } from '@mui/material/styles';

export const headItem: SxProps<Theme> = {
  typography: 'body1Bold',
  color: 'white.main',
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
};

export const bodyItem: SxProps<Theme> = {
  typography: 'body1Medium',
  color: 'white.main',
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
  width: 'fit-content',
};

export const tableColumn: SxProps<Theme> = {
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
  display: '-webkit-box',
  WebkitLineClamp: '1',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
};

export const commentItem: SxProps<Theme> & typeof bodyItem = {
  ...bodyItem,
  width: '360px',
};

export const subjectItem: SxProps<Theme> & typeof bodyItem = {
  ...bodyItem,
  width: '300px',
};

export const buttonsColumn: SxProps<Theme> & typeof tableColumn = {
  ...tableColumn,
  display: 'flex',
  flexDirection: 'row',
};

export const button: SxProps<Theme> = {
  borderRadius: '8px',
  width: '157px',
};
