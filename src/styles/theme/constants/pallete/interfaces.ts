import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gray: Palette['primary'];
    red: Palette['primary'];
    backgroundDark: Palette['primary'];
    backgroundLight: Palette['primary'];
    amber: Palette['primary'];
    indigo: Palette['primary'];
    green: Palette['primary'];
    violet: Palette['primary'];
    mint: Palette['primary'];
    orange: Palette['primary'];
  }

  interface PaletteOptions {
    gray?: PaletteOptions['primary'];
    red?: PaletteOptions['primary'];
    backgroundDark?: PaletteOptions['primary'];
    backgroundLight?: PaletteOptions['primary'];
    amber?: PaletteOptions['primary'];
    indigo?: PaletteOptions['primary'];
    green?: PaletteOptions['primary'];
    violet?: PaletteOptions['primary'];
    mint?: PaletteOptions['primary'];
    orange?: PaletteOptions['primary'];
  }
}
