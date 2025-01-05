// src/App.js
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './pages/Order/Order';

const App = () => {
  const isLoggedIn = localStorage.getItem('token');

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={isLoggedIn ? <Add /> : <Navigate to="/signin" />} />
          <Route path="/list" element={isLoggedIn ? <List /> : <Navigate to="/signin" />} />
          <Route path="/order" element={isLoggedIn ? <Order /> : <Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/signin" />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? '/profile' : '/signin'} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
