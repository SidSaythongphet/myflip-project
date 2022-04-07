import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { baseURL } from "./Globals";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Navbar from "./components/navigation/Navbar";
import Home from "./components/static/Home";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardPage from "./components/dashboard/DashboardPage";
import CreatePost from "./components/post/CreatePost";
import PostPage from "./components/post/PostPage";

const theme = createTheme({
  palette: {
    primary: {
      light: '#00d4ff',
      main: '#094f79',
      dark: '#020024',
    },
    secondary: {
      light: '#ffdd72',
      main: '#ffd54f',
      dark: '#b29537',
    }
  },
  typography: {
    fontFamily: 'Mada',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  }
})

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [posts, setPosts] = useState([])

  console.log("CurrentUser:", currentUser)
  console.log("Posts:", posts)

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    const fetchPosts = async () => {
      const response = await fetch(baseURL + '/api/posts')
      const data = await response.json()
      if (response.ok) {
        setPosts(data)
      } else {
        console.log(data.errors)
      }
    }
    
    if (token && !loggedIn) {
      fetch(baseURL + '/api/profile', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${ token }`
        }
      })
      .then(resp => resp.json())
      .then(user => {
        loginUser(user)
      })
    }

    if (loggedIn) {
      fetchPosts()
    }
    
  }, [loggedIn])

  const loginUser = user => {
    setCurrentUser(user)
    setLoggedIn(true)
  }

  const logoutUser = () => {
    setCurrentUser({})
    setLoggedIn(false)
    setPosts([])
    localStorage.removeItem('jwt')
  }

  const handleUpdateUser = (user) => {
    setCurrentUser(user)
  }

  const handleNewPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const handleDeletePost = (deletedPost) => {
    const updatePosts = posts.filter(post => post.id !== deletedPost.id)
    setPosts(updatePosts)
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar logoutUser={ logoutUser } loggedIn={ loggedIn } currentUser={ currentUser } />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/posts' element={ <PostPage posts={ posts } currentUser={ currentUser } onDeletePost={ handleDeletePost } /> } />
          <Route path='/dashboard/:username' element={ <DashboardPage currentUser={ currentUser } onUpdateUser={ handleUpdateUser } /> }/>
          <Route path='/signup' element={ <Signup loginUser={ loginUser } loggedIn={ loggedIn }/> } />
          <Route path='/login' element={ <Login loginUser={ loginUser } loggedIn={ loggedIn } /> } />
          <Route path='/newpost' element={ <CreatePost currentUser={ currentUser } onNewPost={ handleNewPost } /> } />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
