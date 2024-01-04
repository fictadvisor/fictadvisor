import { Color } from '@mui/material';

import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions {
    logo?: string;
  }

  interface PaletteColor extends Color {}

  interface Palette {
    gray: Palette['primary'];
    backgroundDark: Palette['primary'];
    backgroundLight: Palette['primary'];
    amber: Palette['primary'];
    indigo: Palette['primary'];
    green: Palette['primary'];
    violet: Palette['primary'];
    mint: Palette['primary'];
    orange: Palette['primary'];
    white: Palette['primary'];
  }

  interface PaletteOptions {
    gray?: PaletteOptions['primary'];
    backgroundDark?: PaletteOptions['primary'];
    backgroundLight?: PaletteOptions['primary'];
    amber?: PaletteOptions['primary'];
    indigo?: PaletteOptions['primary'];
    green?: PaletteOptions['primary'];
    violet?: PaletteOptions['primary'];
    mint?: PaletteOptions['primary'];
    orange?: PaletteOptions['primary'];
    white?: PaletteOptions['primary'];
  }
}
