import { createTheme } from '@mui/material/styles';
export const sidebarWidth = 240;
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '14px',
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
