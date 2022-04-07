import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { baseURL } from '../../Globals';
import UserInfoContainer from './UserInfoContainer';
import UsersPostContainer from './UsersPostContainer';

const DashboardPage = ({ currentUser, onUpdateUser, onDeletePost }) => {
  const [usersPosts, setUsersPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(baseURL + `/api/users/${currentUser.id}/posts`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setUsersPosts(data)
      } else {
        console.log(data.error)
      }
    }

    fetchData()
  }, [])

  const handleDeleteUsersPost = (deletedPost) => {
    const updatePosts = usersPosts.filter(post => post.id !== deletedPost.id)
    setUsersPosts(updatePosts)
    onDeletePost(deletedPost)
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} container justifyContent="center">
          <UserInfoContainer currentUser={ currentUser } onUpdateUser={ onUpdateUser }/>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <UsersPostContainer usersPosts={ usersPosts } currentUser={ currentUser } onDeletePost={ handleDeleteUsersPost }/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DashboardPage