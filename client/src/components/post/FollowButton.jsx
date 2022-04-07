import React, { useState, useEffect } from 'react';
import { baseURL, headers } from '../../Globals';
import { Button } from '@mui/material';

const FollowButton = ({ currentUser, post, onFollow }) => {
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    const followees = [...currentUser.followees]
    const follow = followees.find(follow => follow.id === post.user.id)
    if (follow) {
      setIsFollowing(true)
    }
  }, [isFollowing])

  const handleFollow = async () => {
    const strongParams = {
      followship: {
        follower_id: currentUser.id,
        followee_id: post.user.id
      }
    }
  
    const response = await fetch(baseURL + '/api/followships', {
      method: "POST",
      headers: {
        ...headers,
        "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
      },
      body: JSON.stringify(strongParams)
    })
    // response.json() returns a Promise, we must await it
    const data = await response.json()
    if (response.ok) {
      setIsFollowing(true)
      onFollow(data)
    } else {
      console.log(data.error)
    }   
  }

  const handleUnfollow = async (e) => {
    e.preventDefault()
    const response = await fetch(baseURL + `/api/followships/${post.user.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
      }
    })
    if (response.ok) {
      setIsFollowing(false)
    }
  }

  return (
    <>
      {
        !isFollowing
        ?
        <Button onClick={ handleFollow } variant='contained'>Follow</Button>
        :
        <Button onClick={ handleUnfollow }>Unfollow</Button>
      }
    </>
  )
}

export default FollowButton