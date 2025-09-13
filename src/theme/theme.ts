import { createTheme } from "@mui/material/styles";
import { breakpoints } from "./breakpoints";
import { palette } from "./pallete";
import { typography } from "./typography";

/**
 * This is the TypeScript "module augmentation".
 * It's a professional pattern that tells TypeScript about the custom
 * values we've added to our theme. This gives us type safety and
 * autocompletion for our custom colors like `theme.palette.navy`.
 */
declare module '@mui/material/styles' {
  // Allow us to use our custom 'navy' color in the palette
  interface Palette {
    navy: Palette['primary'];
  }
  interface PaletteOptions {
    navy?: PaletteOptions['primary'];
  }
}

/**
 * This is the master theme object.
 * It combines all our design tokens (colors, breakpoints, fonts) into a
 * single object that MUI's ThemeProvider can use. This becomes the
 * "single source of truth" for all styling in the app.
 */
export const theme = createTheme({
  breakpoints,
  palette,
  typography,
  // You can also add component-level overrides here for global styles
  // For example, to change the default props for all MUI Buttons:
  // components: {
  //   MuiButton: {
  //     defaultProps: {
  //       disableRipple: true,
  //     },
  //   },
  // },
});