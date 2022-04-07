import React from 'react';
import { Grid, Typography } from '@mui/material';
import StyledBox from '../styles/StyledBox';

const FollowshipContainer = ({ currentUser, followees }) => {
  return (
    <StyledBox width="800px">
        <Grid container textAlign="center">
          <Grid item xs={6}>
            <Typography variant="h5">Followers</Typography>
            <Typography variant="h6">{ currentUser.followers.length }</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">Following</Typography>
            <Typography variant="h6">{ followees.length }</Typography>
          </Grid>
        </Grid>
    </StyledBox>
  )
}

export default FollowshipContainer