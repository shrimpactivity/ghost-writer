import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#0c0c0c',
      light: '#adfba6',
      contrastText: '#9dfdb2',
    },
    secondary: {
      main: '#ef3d7f',
    },
    background: {
      default: '#1e1e1e',
    },
  },
});

export default theme;
