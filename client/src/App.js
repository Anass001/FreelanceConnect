import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import UserContext from './UserContext';
import { gql, useQuery } from '@apollo/client';

import MainNavigation from './components/navigation/MainNavigation';
import CreateService from './pages/Service/CreateService';
import CreateOrder from './pages/Order/CreateOrder';
import NotFound from './pages/NotFound/NotFound';
import Category from './pages/Category/Category';
import Landing from './pages/Landing/Landing';
import Service from './pages/Service/Service';
import Profile from './pages/Profile/Profile';
import Signup from './pages/Signup/Signup';
import Search from './pages/Search/Search';
import Orders from './pages/Order/Orders';
import Login from './pages/Login/Login';
import Order from './pages/Order/Order';
import Home from './pages/Home/Home';

const GET_USER_BY_TOKEN = gql`
  query GetUserByToken($token: String!) {
    getUserByToken(token: $token) {
        _id
        username
        profile_picture
    }
  }
`;

function MainWrapper({ token }) {

  const { data } = useQuery(GET_USER_BY_TOKEN, {
    variables: { token: token },
  });

  return (
    <div className="App">
      {
        data && (
          <UserContext.Provider value={{
            token: token,
            userId: data.getUserByToken._id,
            username: data.getUserByToken.username,
            profilePicture: data.getUserByToken.profile_picture,
          }}>
            <BrowserRouter>
              <React.Fragment>
                <MainNavigation />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route exact path="/home" element={<Home />} />
                  <Route exact path='/services/:id' element={<Service />} />
                  <Route exact path="/create-service" element={<CreateService />} />
                  <Route exact path="/user/:id" element={<Profile />} />
                  <Route exact path="/search/:query" element={<Search />} />
                  <Route exact path="/create-order/:id" element={<CreateOrder />} />
                  <Route exact path="/orders" element={<Orders />} />
                  <Route exact path="/orders/:id" element={<Order />} />
                  <Route exact path="/categories/:category" element={<Category />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </React.Fragment>
            </BrowserRouter>
          </UserContext.Provider>
        )
      }
    </div>
  );
}


function App() {

  const token = Cookies.get('token');

  if (!token) {
    return (
      <div className="unauthenticated-content__container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path='/services/:id' element={<Service />} />
            {/* <Route exact path="/home" element={<Home />} /> */}
            <Route exact path="/user/:id" element={<Profile />} />
            <Route exact path="/search/:query" element={<Search />} />
            {/* <Route exact path="/categories/:category" element={<Category />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    )
  }

  return (
    <MainWrapper token={token} />
  );

}

export default App;
