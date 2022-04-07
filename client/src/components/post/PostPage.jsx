import React from 'react';
import { Grid } from '@mui/material';
import PostCard from './PostCard';

const PostPage = ({ posts, currentUser }) => {
  console.log(posts)
  const renderPosts = posts.map(post => <PostCard key={ post.id } post={ post } currentUser={ currentUser } />)

  return (
    <Grid container spacing={1} justifyContent="center" sx={{  width: '1500px', margin: 'auto' }}>
      { renderPosts }
    </Grid>
  )
}

export default PostPage