import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import MainNavigation from './components/navigation/MainNavigation';
import Categories from './components/categories/Categories';
import 'font-awesome/css/font-awesome.min.css';


function App() {
  const [token, setToken] = useState(null);

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
          </Routes>
        </React.Fragment>

      </BrowserRouter>
    </div>
  );
}

export default App;
