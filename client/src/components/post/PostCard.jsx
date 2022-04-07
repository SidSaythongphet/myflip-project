import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Switch from '@mui/material/Switch';
import { Grid } from '@mui/material';

const PostCard = ({ post, currentUser }) => {
  const { id, body, image_url, user } = post
  const [checked, setChecked] = useState(false)

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

  return (
    <Grid item>
      <Card sx={{ width: 400 }}>
        <CardHeader
          avatar={
            <Avatar
              src={ user.profile_picture_url ? user.profile_picture_url  : null }
            />
          }
          title={ <Typography>{ user.username }</Typography> }
        />
        <CardMedia
          component="img"
          height="400"
          image={ image_url[!checked ? 0 : 1] }
          alt={ user.first_name + "'s image" }
        />
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />  
        <CardActions disableSpacing>
          <IconButton aria-label="add comment">
            <AddCommentIcon />
          </IconButton>
        </CardActions>        
        <CardContent>
          <Typography variant="body1">
            { body }
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default PostCard