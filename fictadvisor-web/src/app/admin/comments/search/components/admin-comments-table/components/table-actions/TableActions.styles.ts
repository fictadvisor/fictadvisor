import { SxProps, Theme } from '@mui/material/styles';

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

export const buttonsColumn: SxProps<Theme> & typeof tableColumn = {
  ...tableColumn,
  display: 'flex',
  flexDirection: 'row',
};
