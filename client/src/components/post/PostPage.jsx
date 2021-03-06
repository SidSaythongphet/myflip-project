import React from 'react';
import { Grid } from '@mui/material';
import PostCard from './PostCard';

const PostPage = ({ posts, currentUser, onDeletePost, onFollow, onUnfollow }) => {
  const renderPosts = posts.map(post => <PostCard key={ post.id } post={ post } currentUser={ currentUser } onDeletePost={ onDeletePost } onFollow={ onFollow } onUnfollow={ onUnfollow }/>)

  return (
    <Grid container spacing={1} justifyContent="center" sx={{  width: '1500px', margin: 'auto', paddingBottom: '50px' }}>
      { renderPosts }
    </Grid>
  )
}

export default PostPage