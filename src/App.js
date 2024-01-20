import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Login from './components/Login';



function App() {

  const [userType, setUserType] = useState('');
  const [loggedUser, setLoggedUser] = useState([]);

  return(
    <Routes>
      <Route path="/*" element={<Login userType={userType} setUserType={setUserType} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />} />
      <Route path="home" element={<Home userType={userType} setUserType={setUserType} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />} />
    </Routes>
  )    
}

export default App;
