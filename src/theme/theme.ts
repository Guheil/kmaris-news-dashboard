
import { createTheme } from "@mui/material/styles";
import { breakpoints } from "./breakpoints";
import { palette } from "./palette"; // Update to "./palette" if renamed
import { typography } from "./typography";

// Module augmentation to extend MUI's types
declare module '@mui/material/styles' {
  // Extend Palette to include custom properties
  interface Palette {
    navy: Palette['primary']; // Matches structure of primary, secondary, etc.
    border: {
      main: string;
      light: string;
      dark: string;
      contrast: string;
    };
  }
  // Extend PaletteOptions for theme creation
  interface PaletteOptions {
    navy?: PaletteOptions['primary'];
    border?: {
      main: string;
      light: string;
      dark: string;
      contrast: string;
    };
  }
  // Extend TypeText to include custom text properties
  interface TypeText {
    primary: string;
    light: string;
    dark: string;
    contrast: string;
  }
}

/**
 * Master theme object combining design tokens
 */
export const theme = createTheme({
  breakpoints,
  palette,
  typography,
});