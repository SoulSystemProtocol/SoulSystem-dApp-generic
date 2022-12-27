import { createTheme } from '@mui/material/styles';
import { purple, blue, indigo } from '@mui/material/colors';
export const sidebarWidth = 240;
// const accent = '#8E54E9'; //Purple (Button)
// const accent = purple['A200'];
// const accent = blue['500'];
const accent = indigo['A100'];
const accentDisabled = '#ae71f2'; //Purple disabled

export const darkTheme = createTheme({
  palette: {
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
        // rounded: {
        //   borderRadius: '16px',
        // },
        contained: {
          // backgroundImage:
          //   'linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%)',
          background: 'linear-gradient(to right bottom, #4776E6, #8E54E9)',
          color: '#eee',
          padding: '8px 15px 6px',
        },
        outlined: {
          border: '-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
      background: '-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '2.25rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.6rem',
    },
    h4: {
      fontSize: '1.4rem',
      fontFamily: '"Montserrat", Open Sans',
    },
    h5: {
      fontSize: '1.2rem',
    },
    subtitle1: {
      opacity: 0.75,
      fontWeight: 400,
    },
    body2: {},
  },
});
