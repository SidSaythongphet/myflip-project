import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Navbar from "./components/navigation/Navbar";
import Home from "./components/static/Home";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  const [title, setTitle] = useState()
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    fetch("/api/")
      .then((r) => r.json())
      .then((data) => setTitle(data.server));
  }, []);

  const loginUser = user => {
    setCurrentUser(user)
    setLoggedIn(true)
  }

  const logoutUser = () => {
    setCurrentUser({})
    setLoggedIn(false)
    localStorage.removeItem('jwt')
  }


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar logoutUser={ logoutUser } loggedIn={ loggedIn } currentUser={ currentUser } />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/signup' element={ <Signup loginUser={ loginUser } loggedIn={ loggedIn }/> } />
          <Route path='/login' element={ <Login /> } />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
