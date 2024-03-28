import { SxProps, Theme } from '@mui/material/styles';

export const page: SxProps<Theme> = {
  padding: '16px',
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
