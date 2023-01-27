import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="div">GhostWriter</Typography>
        <AgricultureIcon />
        <Box sx={{ flexGrow: 1}}>Github</Box>
      </Toolbar>
    </AppBar>
    </Box>
    
  );
};

export default Header;
