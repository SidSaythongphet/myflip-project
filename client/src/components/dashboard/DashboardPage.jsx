import React from 'react';
import UserInfoContainer from './UserInfoContainer';
import { Container, Grid, Typography } from '@mui/material';
import StyledBox from '../styles/StyledBox';

const DashboardPage = ({ currentUser }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} container justifyContent="center">
          <UserInfoContainer currentUser={ currentUser }/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DashboardPage