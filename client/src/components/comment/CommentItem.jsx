import React from 'react';
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { baseURL } from '../../Globals';

const CommentItem = ({ comment, currentUser, onDeleteComment }) => {

  const handleDelete = () => {
    fetch(baseURL + `/api/comments/${comment.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
      }
    })
    .then(resp => {
      if (resp.ok) {
        onDeleteComment(comment)
      } else {
        //TODO add toast error
        resp.json().then(console.log)
      }
    })
  }

  return (
    <Grid item xs={12} container justifyContent='space-between'>
      <Grid item xs={2} alignSelf='center'>
        <Avatar src={ comment.user.profile_picture_url ? comment.user.profile_picture_url : null } sx={{ width: 40, height: 40 }}></Avatar>
      </Grid>
      <Grid item xs={9}>
        <Typography variant='subtitle1' fontWeight='bold'>{ comment.user.username }</Typography>
        <Typography variant='body1'>{ comment.body }</Typography>
      </Grid>
      <Grid item xs={1}>
        {comment.user.id === currentUser.id ? <Button onClick={ handleDelete }>&#10005;</Button> : null }
      </Grid>
    </Grid>
  )
}

export default CommentItem