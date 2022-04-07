import { Grid, Typography } from '@mui/material';
import React from 'react';
import UsersPostCard from '../post/UsersPostCard';
import StyledBox from '../styles/StyledBox';

const UsersPostContainer = ({ usersPosts, currentUser, onDeletePost }) => {
  const renderUsersPosts = usersPosts.map(post => <UsersPostCard key={ post.id } post={ post } currentUser={ currentUser } onDeletePost={ onDeletePost }/>)

  return (
    <StyledBox width='800px'>
      <Grid container justifyContent='center'>
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