// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaKey } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful");
        const { admin, token} = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('adminName', admin.name);
        localStorage.setItem('photo',admin.photo)
        localStorage.setItem('role',admin.role)
        navigate('/dashboard');
        console.log(response)
      } else {
        setError("Invalid username or password");
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid username or password');
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Admin</h1>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <FaKey className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
