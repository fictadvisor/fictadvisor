import { CSSProperties } from 'react';

import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h2Bold: CSSProperties;
    h3Bold: CSSProperties;
    h3SemiBold: CSSProperties;
    h4Medium: CSSProperties;
    h4Bold: CSSProperties;
    h5Bold: CSSProperties;
    h6Medium: CSSProperties;
    h6Bold: CSSProperties;
    body1Bold: CSSProperties;
    body1Medium: CSSProperties;
    body2Bold: CSSProperties;
    body2Medium: CSSProperties;
    buttonBold: CSSProperties;
  }

  interface TypographyVariantsOptions {
    h2Bold?: CSSProperties;
    h3Bold?: CSSProperties;
    h3SemiBold?: CSSProperties;
    h4Medium?: CSSProperties;
    h4Bold?: CSSProperties;
    h5Bold?: CSSProperties;
    h6Medium?: CSSProperties;
    h6Bold?: CSSProperties;
    body1Bold?: CSSProperties;
    body1Medium?: CSSProperties;
    body2Bold?: CSSProperties;
    body2Medium?: CSSProperties;
    buttonBold?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h2Bold: true;
    h3Bold: true;
    h3SemiBold: true;
    h4Medium: true;
    h4Bold: true;
    h5Bold: true;
    h6Medium: true;
    h6Bold: true;
    body1Bold: true;
    body1Medium: true;
    body2Bold: true;
    body2Medium: true;
    buttonBold: true;
    subtitle1: false;
    subtitle2: false;
    caption: false;
  }
}
