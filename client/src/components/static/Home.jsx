import { Grid, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <Grid container justifyContent='center' >
      <Grid item sx={{ marginTop: '100px'}}>
        <Typography
          variant="h4"
          noWrap
          component="div"
          fontFamily="Permanent Marker"
          sx={{ flexGrow: 1, display: { xs: 'flex' }, padding: '0 50px' }}
        >
          Welcome to myFlip
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Home