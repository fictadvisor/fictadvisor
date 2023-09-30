import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {};

export const datePicker: SxProps<Theme> = {
  '.MuiInputBase-root': {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
};

export const input: SxProps<Theme> = {
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

  '.MuiInputBase-root': {
    paddingY: '10px',
    height: '40px',
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: '16px',
  },
  '.MuiInputBase-input': {
    padding: 0,
  },
};

export const calendar: SxProps<Theme> = {
  color: 'white.main',
  '& .MuiYearCalendar-root': {
    '& .MuiPickersYear-yearButton': {
      color: 'white',
    },
  },
  '& .MuiPickersLayout-contentWrapper': {
    backgroundColor: 'backgroundDark.100',
    border: '2px solid',
    borderColor: 'backgroundDark.100',
  },
  '& .MuiDateCalendar-root': {
    backgroundColor: 'backgroundDark.100',
  },
  '& .MuiPickersDay-root': {
    color: 'white.main',
  },
  '& .MuiButtonBase-root': {
    color: 'white.main',
    '&.Mui-disabled': {
      color: 'grey.400',
    },
  },
  '& .MuiPickersCalendarHeader-label': {
    color: 'white.main',
  },
  '& .MuiTypography-root': {
    color: 'grey.400',
  },
  '& .MuiPickersDay-dayWithMargin': {
    borderRadius: '6px',
    m: '4px 6px',
    width: '28px',
    height: '28px',
    '&:not(.Mui-selected):hover': {
      backgroundColor: 'grey.100',
    },
    '&.Mui-selected': {
      backgroundColor: 'grey.200',
    },
    '&.MuiPickersDay-today': {
      backgroundColor: 'primary.400',
      border: 'none',
      '&:hover': {
        backgroundColor: 'primary.500',
      },
    },
  },
  '& .MuiDayCalendar-weekContainer': {
    '&:has(.Mui-selected)': {
      backgroundColor: 'grey.100',
      borderRadius: '6px',
    },
  },
};
