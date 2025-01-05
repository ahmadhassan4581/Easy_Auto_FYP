import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/owners/signInOwner', {
        email,
        password,
      });

      console.log('API Response:', response.data);
      if (response.data.message === 'Login successful') {
        const { owner, token } = response.data;

        if (owner && owner.id) {
          localStorage.setItem('token', token);
          localStorage.setItem(
            'owner',
            JSON.stringify({
              ownerId: owner.id,
              ownerName: owner.ownerName,
              email: email,
            })
          );

          console.log('Owner stored in localStorage:', JSON.parse(localStorage.getItem('owner')));
          setMessage('Logged in successfully');
          navigate('/profile'); // Redirect to profile page
        } else {
          console.error('Owner data missing');
          setMessage('Owner data not found in response');
        }
      } else {
        setMessage('Invalid login credentials');
      }
    } catch (error) {
      console.error('Sign In Error:', error);
      setMessage(error.response?.data.message || 'Error signing in');
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
