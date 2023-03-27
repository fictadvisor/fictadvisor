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
