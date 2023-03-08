import { createTheme } from '@mui/material/styles';
import { colors, PaletteMode } from '@mui/material';

export enum ThemeModes {
  DARK = 'dark',
  LIGHT = 'light',
}

const themeConfigs = {
  custom: ({ mode }: { mode: PaletteMode }) => {
    const customPalette =
      mode === ThemeModes.DARK
        ? {
            primary: {
              main: '#ff0000',
              contrastText: '#fff',
            },

            secondary: {
              main: '#f44336',
              contrastText: '#fff',
            },
            background: {
              default: '#000',
              paper: '#131313',
            },
          }
        : {
            primary: {
              main: '#ff0000',
            },

            secondary: {
              main: '#f44336',
            },
            background: {
              default: colors.grey['100'],
            },
          };

    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};

export default themeConfigs;
