import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { fileChecksum } from '../utils/checksum';
import { baseURL, headers } from '../../Globals';
import CircularProgress from '@mui/material/CircularProgress';
import { CardMedia, Grid } from '@mui/material';

const UpdateProfilePicture = ({ id, onUpdateUser }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null)
  const [imageURL, setImageURL] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (file) {
      const fileURL = URL.createObjectURL(file)
      setImageURL(fileURL)
    }
  }, [file])

  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
    setImageURL(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    
    const checksum = await fileChecksum(file)
    // POST request to API for authorized URL
    const createFileParams = await fetch(baseURL + '/api/presigned_url', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        file: {
          filename: file.name,
          byte_size: file.size,
          checksum: checksum,
          content_type: 'image/png',
          metadata: {
            'message': 'image for parsing'
          }
        }
      })
    })
    const presignedFileParams = await createFileParams.json()
    if (!createFileParams.ok) {
      console.log(presignedFileParams.errors)
    }
    // PUT request to S3 to directly upload file and recieve URL
    const awsResponse = await fetch(presignedFileParams.direct_upload.url, {
      method: 'PUT',
      headers: presignedFileParams.direct_upload.headers,
      body: file
    })
    if (!awsResponse.ok) {
      console.log(awsResponse)
    }
    // POST presignedFileParams.blob_signed_id as profile_picture value     
    const response = await fetch(baseURL + `/api/users/${id}`, {
      method: 'PATCH',
      headers: {
        ...headers,
        "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
      },
      body: JSON.stringify({
        profile_picture: presignedFileParams.blob_signed_id
      })
    })
    const data = await response.json()
    if (response.ok) {
      onUpdateUser(data.user)
      setOpen(false)
      setUploading(false)
    } else {
      console.log(data)
      setUploading(false)
    }
  }
  
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add or Update Profile Picture
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Grid container justifyContent='space-between' direction='column' width='550px' height='550px'>
          <Grid item>
            <DialogTitle>
              Profile Picture
            </DialogTitle>
          </Grid>
          <Grid item alignSelf='center'>
            <DialogContent>
              {
                imageURL
                ? 
                <CardMedia
                  component="img"
                  height="300px"
                  width="300px"
                  image={ imageURL }
                  alt="preview"
                />
                : 
                null 
              }
              <input type="file" accept="image/*" onChange={ (e) => setFile(e.target.files[0])} alt="preview profile picture"/>
            </DialogContent>
          </Grid>
          <Grid item>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
              { uploading ? <CircularProgress /> : null }
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default UpdateProfilePicture