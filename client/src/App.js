import './App.css';
// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import MainNavigation from './components/navigation/MainNavigation';
import 'font-awesome/css/font-awesome.min.css';
import Service from './pages/Service/Service';
import Cookies from 'js-cookie';
import Profile from './pages/Profile/Profile';
import CreateService from './pages/Service/CreateService';

function App() {

  const token = Cookies.get('token');
  console.log(token);

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    )
  }
  return (
    <div className="App">
      <BrowserRouter>
        <React.Fragment>
          <MainNavigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path='/services/:id' element={<Service />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<CreateService />} />
          </Routes>
        </React.Fragment>

      </BrowserRouter>
    </div>
  );
}

export default App;
