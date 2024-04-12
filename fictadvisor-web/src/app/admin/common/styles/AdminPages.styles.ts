import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const table: SxProps<Theme> = {
  minWidth: '992px',
};

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

export const trashIcon: SxProps<Theme> = {
  padding: '6px',
  borderRadius: '50%',
};

export const actionsWrapper: SxProps<Theme> = {
  padding: '0 16px 0  0',
  width: '214px',
};

export const avatar: SxProps<Theme> = {
  width: '36px',
  height: '36px',
  borderRadius: '32px',
};

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
};

export const tableColumn: SxProps<Theme> = {
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
};

export const tag: SxProps<Theme> = {
  typography: 'body1Medium',
  color: 'white.main',
};

export const button: SxProps<Theme> = {
  borderRadius: '8px',
  width: '157px',
};

export const actions: SxProps<Theme> = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'end',
};

export const header: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '32px',
  mb: '8px',
};

export const buttonHeader: SxProps<Theme> = {
  width: '135px',
  height: '48px',
  borderRadius: '8px',
};

export const search: SxProps<Theme> = {
  width: '100%',
  maxWidth: '344px',
};

export const dropdown: SxProps<Theme> = {
  width: '100%',
  maxWidth: '188px',
};

export const filterBar: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'start',
  gap: '8px',
};

export const dividerVert: SxProps<Theme> = {
  height: '46px',
  width: '1px',
  background: theme.palette.backgroundDark[600],
  mx: '4px',
};

export const dividerHor: SxProps<Theme> = {
  my: '4px',
  height: '1px',
  width: '100%',
  backgroundColor: theme.palette.backgroundDark[600],
  borderColor: 'transparent',
};

export const pagination: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  borderBottom: 'none',
  color: 'backgroundDark.600',
  '& .MuiTablePagination-selectLabel': {
    typography: 'body1Bold',
  },
  '& .MuiTablePagination-select, & .MuiTablePagination-displayedRows': {
    color: 'white.main',
    typography: 'body1Medium',
  },
  '& .MuiTablePagination-selectIcon': {
    color: 'backgroundDark.600',
  },
  '& .MuiTablePagination-actions': {
    '& .Mui-disabled': {
      color: 'backgroundDark.500',
    },
    color: 'backgroundDark.600',
  },
};

export const buttonSection: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'right',
  gap: '16px',
};

export const title: SxProps<Theme> = {
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
  padding: '16px',
  width: '50%',
  '& .MuiCardHeader-subheader': {
    typography: 'body1',
    color: 'grey.500',
  },
};

export const buttonV2: SxProps<Theme> = {
  width: '135px',
  height: '48px',
  borderRadius: '8px',
};

export const input: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    width: '344px',
    height: '46px',
  },
  '.MuiInputLabel-outlined': {
    top: '-2px',
  },
  '.MuiInputLabel-outlined.MuiInputLabel-shrink': {
    top: '0px',
  },
};

export const name: SxProps<Theme> = {
  typography: 'body2',
  color: 'grey.500',
  fontWeight: 500,
};

export const wrapper: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '16px',
};

export const inputsWrapper: SxProps<Theme> = {
  width: '100%',
  maxWidth: '308px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

export const form: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '12px',
};

export const infoWrapper: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  '.MuiAutocomplete-root': {
    '.MuiFormLabel-root': {
      color: 'inherit',
      padding: '0px',
      top: '-3px',
      left: '-1px',
    },
  },
};

export const editButton: SxProps<Theme> = {
  width: '100%',
  maxWidth: '242px',
};

export const editName: SxProps<Theme> = {
  width: '656px',
  p: '16px',
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
};
