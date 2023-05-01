import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from './pages/Auth';
import Home from './pages/Home';

function App() {
  const [token, setToken] = useState(null);

  if(!token) {
    return <Auth setToken={setToken} />
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
