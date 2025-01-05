import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token'); // Check login status

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('owner');
    navigate('/signin');
  };

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <div className='navbar'>
      <img onClick={redirectToHome} className='logo' src={assets.logo} alt="Logo" />
      {isLoggedIn && ( // Show the logout button only if the user is logged in
        <button className='logout' onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
