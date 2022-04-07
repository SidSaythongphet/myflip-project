import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <Box 
      sx={{ flexGrow: 1 }}
      style={{
        margin: '0 0 100px'
      }}
    >
      <AppBar position="fixed" 
        style={{
          backgroundColor: '#800000'
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            fontFamily="Permanent Marker"
            sx={{ flexGrow: 1, display: { xs: 'flex' }, padding: '0 50px' }}
          >
            myFlip
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex' }, padding: '0 50px' }}>
            <Link to='/signup' style={{ textDecoration: 'none' }}><Button sx={{ my: 2, color: 'white' }}>Sign Up</Button></Link>
            <Link to='/login' style={{ textDecoration: 'none' }}><Button sx={{ my: 2, color: 'white' }}>Login</Button></Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar