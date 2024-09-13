import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../css/login.css';  // Import the CSS file

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    if (!json.success) {
      alert('Invalid credentials. Please try again.');
    } else {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('authToken', json.authToken);
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <NavBar />
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="label">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="login-btn">Submit</button>
          <Link to="/createuser" className="login-link">New User? Create an account</Link>
        </form>
      </div>
    </div>
  );
}
