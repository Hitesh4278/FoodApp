import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert('Enter Valid Credentials');
    }

    if (json.success) {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('authToken', json.authToken);
      navigate('/');
      // console.log( localStorage.setItem("authToken"))
    }
  };

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    
    <div>
      <NavBar />
      <div className='container d-flex justify-content-center align-items-center'>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: '400px', width: '100%' }}
        >
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Email address</label>
            <input
              type='email'
              className='form-control'
              name='email'
              value={credentials.email}
              onChange={onChange}
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter email'
              style={{ height: '40px', fontSize: '16px' }}
            />
            <small id='emailHelp' className='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className='form-group' style={{ marginBottom: '1px' }}>
            <label htmlFor='exampleInputPassword1'>Password</label>
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              placeholder='Password'
              name='password'
              value={credentials.password}
              onChange={onChange}
              style={{ height: '40px', fontSize: '16px' }}
            />
          </div>
          <button type='submit' className='m-3 btn btn-danger'>
            Submit
          </button>
          <Link to='/createuser' className='m-3 btn btn-danger'>
            I'm a New User
          </Link>
        </form>
      </div>
    </div>
  );
}
