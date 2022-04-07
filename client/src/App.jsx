import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Navbar from "./components/navigation/Navbar";
import Home from "./components/static/Home";

const App = () => {
  const [title, setTitle] = useState()

  useEffect(() => {
    fetch("/api/")
      .then((r) => r.json())
      .then((data) => setTitle(data.server));
  }, []);


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/login' element={ <Login /> } />
      </Routes>
    </Router>
  )
}

export default App;
