import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { baseURL } from "./Globals";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Navbar from "./components/navigation/Navbar";
import Home from "./components/static/Home";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardPage from "./components/dashboard/DashboardPage";

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

  console.log("CurrentUser:", currentUser)

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    
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
    
  }, [loggedIn])

  const loginUser = user => {
    setCurrentUser(user)
    setLoggedIn(true)
  }

  const logoutUser = () => {
    setCurrentUser({})
    setLoggedIn(false)
    localStorage.removeItem('jwt')
  }

  const handleUpdateUser = (user) => {
    setCurrentUser(user)
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar logoutUser={ logoutUser } loggedIn={ loggedIn } currentUser={ currentUser } />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/dashboard/:username' element={ <DashboardPage currentUser={ currentUser } onUpdateUser={ handleUpdateUser } /> }/>
          <Route path='/signup' element={ <Signup loginUser={ loginUser } loggedIn={ loggedIn }/> } />
          <Route path='/login' element={ <Login loginUser={ loginUser } loggedIn={ loggedIn } /> } />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
