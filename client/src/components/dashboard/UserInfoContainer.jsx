import React, { useState } from 'react';
import { baseURL, headers } from '../../Globals';
import { Avatar, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StyledBox from '../styles/StyledBox';
import UpdateProfilePicture from './UpdateProfilePicture';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserInfoContainer = ({ currentUser, onUpdateUser }) => {
  const { id, first_name, last_name, username, email, profile_picture_url} = currentUser
  const [editable, setEditable] = useState(false)
  const [updateForm, setUpdateForm] = useState({
    first_name: first_name,
    last_name: last_name,
    username: username,
    email: email
  })
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const response = await fetch(baseURL + `/api/users/${id}`, {
      method: "PATCH",
      headers: {
        ...headers,
        "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
      },
      body: JSON.stringify(updateForm)
    })
    const data = await response.json()
    if (response.ok) {
      onUpdateUser(data.user)
      setEditable(!editable)
      navigate(`/dashboard/${ updateForm.username }`)
      toast.success('Account information updated.')
    } else {
      console.log(data)
    }
  }

  return (
    <StyledBox width="800px">
      <Grid container sx={{ height: "100%" }} justifyContent="space-evenly">
        <Grid item xs={5} container justifyContent="center">
          <Stack alignItems="center" spacing={2}>
            <Avatar alt={ `${first_name} ${last_name}` } src={ profile_picture_url === "" ? "/static/images/avatar/2.jpg" : profile_picture_url } sx={{ width: 200, height: 200 }}/>
            <UpdateProfilePicture id={ id } onUpdateUser={ onUpdateUser } />
          </Stack>
        </Grid>
        <Grid item xs={7} container sx={{ padding: '10px'}}>
          <Grid item xs={12}>
            <Typography variant="h5">General Account Settings</Typography>
          </Grid>
          <Grid item xs={12} container height='50px'>
            <Grid item xs={3}>
              <Typography>Name</Typography>
            </Grid>
            <Grid item xs={9} container spacing={1}>
              {
                !editable
                ?
                <Grid item xs={6}>
                  <Typography>{ first_name } { last_name }</Typography>    
                </Grid>
                :
                <>
                  <Grid item xs={6}>
                    <TextField 
                      id="outlined-basic" 
                      fullWidth 
                      label="First Name"
                      variant="outlined" 
                      size="small" 
                      name="first_name" 
                      value={ updateForm.first_name } 
                      onChange={ handleChange }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField 
                      id="outlined-basic" 
                      fullWidth 
                      label="Last Name" 
                      variant="outlined" 
                      size="small" 
                      name="last_name" 
                      value={ updateForm.last_name } 
                      onChange={ handleChange }
                    />
                  </Grid>
                </>
              }
            </Grid>
          </Grid>
          <Grid item xs={12} container height='50px'>
            <Grid item xs={3}>
              <Typography>Username</Typography>
            </Grid>
            <Grid item xs={9}>
              {
                !editable
                ?
                <Grid item xs={6}>
                  <Typography>{ username }</Typography>    
                </Grid>
                :
                <TextField 
                  id="outlined-basic"
                  disabled={ !editable ? true : null }
                  fullWidth 
                  variant="outlined"
                  size="small" 
                  name="username" 
                  value={ updateForm.username } 
                  onChange={ handleChange }
                />
              }
            </Grid>
          </Grid>
          <Grid item xs={12} container height='50px'>
            <Grid item xs={3}>
              <Typography>Email</Typography>
            </Grid>
            <Grid item xs={9}>
              {
                !editable
                ?
                <Grid item xs={6}>
                  <Typography>{ email }</Typography>    
                </Grid>
                :
                <TextField 
                  id="outlined-basic"
                  disabled={ !editable ? true : null }
                  fullWidth 
                  variant="outlined"
                  size="small" 
                  name="email" 
                  value={ updateForm.email } 
                  onChange={ handleChange }
                />
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item container justifyContent='flex-end' spacing={1}>
          {
            editable 
            ? 
            <Grid item>
              <Button onClick={ handleSubmit } variant="contained">Submit</Button> 
            </Grid>  
            : 
            null 
          }
          <Grid item>
            <Button onClick={ (e) => setEditable(!editable) } variant="contained">{ !editable ? "Edit" : "Cancel" }</Button>
          </Grid>
        </Grid>
      </Grid>
    </StyledBox>
  )
}

export default UserInfoContainer