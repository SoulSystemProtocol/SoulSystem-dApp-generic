import { createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
export const sidebarWidth = 240;
const accent = indigo['A100'];
const calloutBackground = 'linear-gradient(to right bottom, #4776E6, #8E54E9)';

//Define a Custom Color
declare module '@mui/material/styles' {
  interface Palette {
    calloutBackground: string;
  }
  interface PaletteOptions {
    calloutBackground: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    calloutBackground: true;
  }
}

export const darkTheme = createTheme({
  palette: {
    calloutBackground, //Custom Color
    mode: 'dark',
    primary: {
      main: accent,
    },
    secondary: {
      main: '#f44336',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          background: calloutBackground,
          color: '#eee',
          padding: '8px 15px 6px',
        },
        outlined: {
          //Attempt at rounded gradient border
          // borderImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%) 1',
          // borderImage: 'linear-gradient(to right bottom, #4776E6, #8E54E9) 1',
          // background: `linear-gradient(${this.palette.background.default}, ${theme.palette.background.default}) padding-box, linear-gradient(to right, darkblue, darkorchid) border-box`,
          // borderRadius: '20px',
          // border: '3px solid transparent',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '14px',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
        // underlineHover: {
        //   '&:hover': {
        //     textDecoration: 'none',
        //   },
        // },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          //Doesn't Work...
          '&::placeholder': {
            color: 'blue',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '10px !important',
        },
      },
    },
  },
  typography: {
    h1: {
      fontFamily: '"Montserrat", Open Sans',
      // background: '-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      background: 'linear-gradient(to right bottom, #8c9eff, #4776E6, #8E54E9)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '2.25rem',
    },
    h2: {
      fontSize: '1.8rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    h4: {
      fontSize: '1.3rem',
      fontFamily: '"Montserrat", Open Sans',
    },
    h5: {
      fontSize: '1.1rem',
    },
    subtitle1: {
      opacity: 0.75,
      fontWeight: 400,
    },
    body2: {},
  },
});
