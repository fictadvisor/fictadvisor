import { CSSProperties } from 'react';

import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h2Bold: CSSProperties;
    h3SemiBold: CSSProperties;
    h4Medium: CSSProperties;
    h4Bold: CSSProperties;
    h6Medium: CSSProperties;
    h6Bold: CSSProperties;
    body1Bold: CSSProperties;
    body2Bold: CSSProperties;
    buttonBold: CSSProperties;
  }

  interface TypographyVariantsOptions {
    h2Bold?: CSSProperties;
    h3SemiBold?: CSSProperties;
    h4Medium?: CSSProperties;
    h4Bold?: CSSProperties;
    h6Medium?: CSSProperties;
    h6Bold?: CSSProperties;
    body1Bold?: CSSProperties;
    body2Bold?: CSSProperties;
    buttonBold?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h2Bold: true;
    h3SemiBold: true;
    h4Medium: true;
    h4Bold: true;
    h6Medium: true;
    h6Bold: true;
    body1Bold: true;
    body2Bold: true;
    buttonBold: true;
    subtitle1: false;
    subtitle2: false;
    caption: false;
  }
}
