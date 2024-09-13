import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../css/signup.css"; // Import the CSS file

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + "createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    if (response.ok) {
      alert("Signup Successful");
    } else {
      alert("Signup failed. Please enter valid credentials.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <NavBar />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Sign Up</h2>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={credentials.name}
              onChange={onChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              className="form-input"
            />
            <small id="emailHelp" className="form-help">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputAddress" className="form-label">Address</label>
            <input
              type="text"
              id="exampleInputAddress"
              placeholder="Address"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">Submit</button>
            <Link to="/login" className="login-link">Already a User?</Link>
          </div>
        </form>
      </div>
    </>
  );
}
