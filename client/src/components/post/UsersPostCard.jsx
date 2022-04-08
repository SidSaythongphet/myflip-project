import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Switch from '@mui/material/Switch';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack, Grid } from '@mui/material';
import DeletePostButton from './DeletePostButton';

const UsersPostCard = ({ post, currentUser, onDeletePost }) => {
  const { body, image_url, likes } = post
  const [checked, setChecked] = useState(false)

  return (
    <Grid item>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          component="img"
          height="400"
          image={ image_url[!checked ? 0 : 1] }
          alt={ currentUser.first_name + "'s image" }
        />
        <Stack direction='row' justifyContent='space-between'>
          <Switch
            checked={checked}
            onChange={ (e) => setChecked(e.target.checked) }
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography variant="body1" alignSelf='center'>
            { likes.length } likes
          </Typography>
          <DeletePostButton post={ post } onDeletePost={ onDeletePost } />
        </Stack>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            { body }
          </Typography>
        </CardContent>  
      </Card>
    </Grid>
  )
}

export default UsersPostCard