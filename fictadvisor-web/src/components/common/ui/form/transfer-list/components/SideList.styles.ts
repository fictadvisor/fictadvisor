import { SxProps, Theme } from '@mui/material/styles';

export const list: SxProps<Theme> = {
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'backgroundDark.600',
  borderRadius: '8px',
  padding: '16px',
  width: '480px',
};

export const avatar: SxProps<Theme> = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
};

export const row: SxProps<Theme> = {
  gap: '16px',
  minHeight: '48px',
  padding: '8px 16px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  borderTop: '1px solid',
  borderColor: 'backgroundDark.400',
};

export const listHeading: SxProps<Theme> = {
  padding: '8px 16px',
  typography: 'body1Bold',
};

export const bodyItem: SxProps<Theme> = {
  typography: 'body1Medium',
  color: 'white.main',
  border: 'none',
  padding: '0',
};

export const pagination: SxProps<Theme> = {
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
