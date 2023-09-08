import { SxProps, Theme } from '@mui/material/styles';

export const picker: SxProps<Theme> = {
  color: 'white.main',
  '& .MuiMonthCalendar-root, &, & .MuiYearCalendar-root': {
    width: '280px',
  },
  height: '290px',
  '& .MuiButtonBase-root': {
    color: 'white.main',
    '&.MuiPickersDay-dayOutsideMonth': {
      color: 'grey.400',
    },
    '&.MuiPickersDay-dayWithMargin': {
      color: 'grey.800',
      borderRadius: '6px',
      m: '4px 6px',
      width: '28px',
      height: '28px',
      '&.Mui-selected': {
        backgroundColor: 'grey.200',
      },

      '&:not(.Mui-selected):hover': {
        backgroundColor: 'grey.100',
      },
      '&.Mui-disabled': {
        color: 'grey.200',
      },

      '&.MuiPickersDay-today': {
        backgroundColor: 'primary.400',
        '&:hover': {
          backgroundColor: 'primary.500',
        },
      },
    },
  },
  '& .MuiTypography-root': {
    color: 'grey.400',
  },

  '& .MuiDayCalendar-weekContainer': {
    '&:has(.Mui-selected)': {
      backgroundColor: 'grey.100',
      borderRadius: '6px',
    },
  },
};
