'use client';

import { ukUA as MaterialLocale } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';
import { ukUA as DatePickerLocale } from '@mui/x-date-pickers';

import customBreakpoints from '@/styles/theme/constants/breakpoints';
import customPalette from '@/styles/theme/constants/pallete';
import customTypography from '@/styles/theme/constants/typography';

const theme = createTheme(
  {
    palette: customPalette,
    typography: customTypography,
    breakpoints: customBreakpoints,
  },
  MaterialLocale,
  DatePickerLocale,
);

export default theme;
