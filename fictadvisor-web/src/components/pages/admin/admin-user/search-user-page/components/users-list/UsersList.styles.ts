import { SxProps, Theme } from '@mui/material/styles';

export const tableContainer: SxProps<Theme> = {
  backgroundColor: 'backgroundDark.100',
  boxShadow: 'none',
  '.MuiTableCell-root': {
    borderBottom: 'none',
    color: '#fff',
    whiteSpace: 'nowrap',
  },
  '.MuiTableRow-root:hover': {
    backgroundColor: 'backgroundDark.200',
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

export const avatar: SxProps<Theme> = {
  width: '36px',
  height: '36px',
  borderRadius: '32px',
};

export const usernameWrapper: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  alignItems: 'center',
};

export const trashIcon: SxProps<Theme> = {
  padding: '6px',
  borderRadius: '50%',
};
export const actionsWrapper: SxProps<Theme> = {
  padding: '0 16px 0  0',
  width: '214px',
};
