import React from 'react';
import CardContent from '@mui/material/CardContent';
import CommentItem from './CommentItem';
import { Grid } from '@mui/material';

const CommentContainer = ({ comments, currentUser, onDeleteComment }) => {
  const renderComments = comments.map(comment => {
    return (
      <CommentItem key={ comment.id } comment={ comment } currentUser={ currentUser } onDeleteComment={ onDeleteComment }/>
    )
  })

  return (
    <CardContent>
      <Grid container rowSpacing={1}>
        { renderComments }
      </Grid>
    </CardContent>
  )
}


export default CommentContainer