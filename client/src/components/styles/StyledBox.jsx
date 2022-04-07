import React from 'react';
import { Box, Container } from '@mui/material'


const StyledBox = ({ children, height, width = '100%' }) => {
  return (
    <Box 
      sx={{ 
        width, 
        height,
        margin: '25px',
        bgcolor: 'background.paper', 
        borderRadius:'15px', 
        padding: '25px',
        boxShadow: 3
      }} 
    >
      <Container>
        { children }
      </Container>
    </Box>
  )
}

export default StyledBox