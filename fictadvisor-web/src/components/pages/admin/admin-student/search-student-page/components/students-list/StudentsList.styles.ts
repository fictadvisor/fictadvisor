import { SxProps, Theme } from '@mui/material/styles';

export const tableContainer: SxProps<Theme> = {
  backgroundColor: 'backgroundDark.100',
  boxShadow: 'none',
  '.MuiTableCell-root': {
    borderBottom: 'none',
    color: '#fff',
    whiteSpace: 'nowrap',
  },
  '.MuiSvgIcon-root': {
    color: '#fff',
  },
  '.MuiToolbar-root': {
    color: '#fff',
  },
  '.MuiTableRow-root': {
    borderBottom: '1px solid',
    borderBottomColor: 'backgroundDark.400',
  },
};
export const table: SxProps<Theme> = {
  minWidth: '992px',
};
export const actionsWrapper: SxProps<Theme> = {
  padding: '0 16px 0  0',
  width: '214px',
};
