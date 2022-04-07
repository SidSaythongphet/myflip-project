import React from 'react';
import { Grid } from '@mui/material';
import PostCard from './PostCard';

const PostPage = ({ posts, currentUser, onDeletePost, onFollow }) => {
  console.log(posts)
  const renderPosts = posts.map(post => <PostCard key={ post.id } post={ post } currentUser={ currentUser } onDeletePost={ onDeletePost } onFollow={ onFollow } />)

  return (
    <Grid container spacing={1} justifyContent="center" sx={{  width: '1500px', margin: 'auto' }}>
      { renderPosts }
    </Grid>
  )
}

export default PostPage