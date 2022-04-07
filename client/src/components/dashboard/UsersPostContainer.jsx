import { Grid, Typography } from '@mui/material';
import React from 'react';
import UsersPostCard from '../post/UsersPostCard';
import StyledBox from '../styles/StyledBox';

const UsersPostContainer = ({ usersPosts, currentUser }) => {
  const renderUsersPosts = usersPosts.map(post => <UsersPostCard key={ post.id } post={ post } currentUser={ currentUser }/>)

  return (
    <StyledBox width='800px'>
      <Grid container>
        { 
          usersPosts.length > 0 
          ? 
          renderUsersPosts 
          : 
          <Typography textAlign='center'>
            Create your first post
          </Typography> 
        }
      </Grid>
    </StyledBox>
  )
}

export default UsersPostContainer