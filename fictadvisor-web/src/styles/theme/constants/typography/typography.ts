import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Manrope } from 'next/font/google';

export const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});
const typography: TypographyOptions = {
  fontFamily: manrope.style.fontFamily,
  h1: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 96,
    fontWeight: 700,
    lineHeight: 1.16,
  },
  h2: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 60,
    fontWeight: 400,
    lineHeight: 1.16,
  },
  h2Bold: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 60,
    fontWeight: 700,
    lineHeight: 1.16,
  },
  h3: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 36,
    fontWeight: 400,
    lineHeight: 1.28,
  },
  h3SemiBold: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 36,
    fontWeight: 600,
    lineHeight: 1.28,
  },
  h3Bold: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 36,
    fontWeight: 700,
    lineHeight: 1.28,
  },
  h4: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 28,
    fontWeight: 400,
    lineHeight: 1.28,
  },
  h4Medium: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 28,
    fontWeight: 600,
    lineHeight: 1.28,
  },
  h4Bold: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1.16,
  },
  h5: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.28,
  },
  h5Bold: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 24,
    lineHeight: 1.28,
    fontWeight: 700,
  },
  h6: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 1.28,
  },
  h6Medium: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1.28,
  },
  h6Bold: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.28,
  },
  body1: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.4,
  },
  body1Medium: {
    fontFamily: manrope.style.fontFamily,

    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  body1Bold: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.4,
  },
  body2: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2Medium: {
    fontFamily: manrope.style.fontFamily,

    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
  },
  body2Bold: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.5,
  },
  overline: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 11,
    fontWeight: 400,
    lineHeight: 1.6,
  },
  button: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.42,
  },
  buttonBold: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.32,
  },
  subtitle1: undefined,
  subtitle2: undefined,
  caption: undefined,
};

export default typography;
