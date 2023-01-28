import React from 'react';
import { AppBar, Box, Toolbar, Typography, Grid, Tooltip } from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../config/theme';

const Navbar = () => {
  return (
    <ThemeProvider theme={theme}>
    <AppBar component="nav" position="static">
      <Toolbar>
        <Box display="flex" flexWrap="wrap" width="100vw">
          <Box display="flex" flexGrow={1} justifyContent="center" alignItems="center">
            <Box pr="15px">
              <Typography variant="h5" component="div">
                GhostWriter
              </Typography>
            </Box>
            <Box display="flex">
              <AgricultureIcon fontSize="large" />
            </Box>
          </Box>
          <Box
            display="flex"
            flexGrow={1}
            alignItems="center"
            justifyContent="center"
          >
            <Box pr="15px">About</Box>
            <Box pr="15px">Login</Box>
            <Box pr="15px">GitHub</Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
