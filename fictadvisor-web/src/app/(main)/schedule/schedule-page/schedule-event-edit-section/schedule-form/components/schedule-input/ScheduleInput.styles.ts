import { SxProps, Theme } from '@mui/material/styles';

export const input = (size: 'small' | 'medium'): SxProps<Theme> => ({
  width: '100%',
  backgroundColor: 'backgroundDark.200',
  borderRadius: '8px',
  '& .MuiOutlinedInput-input': {
    color: 'white.main',
    '&::placeholder': {
      color: 'grey.600',
    },
    '&.Mui-disabled': {
      WebkitTextFillColor: 'unset',
      opacity: 0.3,
    },
  },
  '& .Mui-disabled': {
    svg: {
      WebkitTextFillColor: 'unset',
      opacity: 0.3,
    },
  },

  '&:hover': {
    '& .MuiOutlinedInput-input': {
      '&::placeholder': {
        color: 'grey.700',
      },
    },
  },

  '& .MuiOutlinedInput-root': {
    '& > fieldset': {
      border: 'none',
    },
  },

  svg: {
    color: 'grey.800',
  },

  ...(size === 'small' && {
    '.MuiInputBase-root': {
      paddingY: '10px',
      paddingX: '12px',
      height: '40px',
    },
    '.MuiInputBase-input': {
      padding: 0,
    },
  }),
  ...(size === 'medium' && {
    '.MuiInputBase-root': {
      padding: '12px',
      height: '50px',
      fontSize: '20px',
    },
  }),
});
