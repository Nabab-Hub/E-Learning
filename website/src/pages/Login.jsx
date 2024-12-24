import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming your CSS file is named Login.css
import { toast } from 'react-toastify'; // Make sure you have installed react-toastify for notifications
import { useAuth } from '../store/auth';

const Login = () => {
  // States for user role and input fields
  const [loginType, setLoginType] = useState('student'); // default login type
  const [email, setEmail] = useState(''); // state for email input
  const [password, setPassword] = useState(''); // state for password input
  const {storeTokenInLS, BACKEND_HOSTING_URL} = useAuth();

  const navigate = useNavigate();

  // Handle change for login type (role selection)
  const handleLoginTypeChange = (type) => {
    setLoginType(type);
  };

  // Handle change for email input
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle change for password input
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle login (this is where the authentication logic should go)
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior

    // Validation check (could be improved)
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    try {
      // Make the POST request to the backend for login/signup
      const response = await fetch(`${BACKEND_HOSTING_URL}/api/auth/login`, {  // Ensure correct API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const resData = await response.json();

      if (response.ok) {
        toast.success('Logged in successfully!');
        // Assuming the response contains a token
        storeTokenInLS(resData.token); // Store the token in LocalStorage

        // Redirect to the corresponding dashboard based on the login type
        navigate(`/${loginType}`);
      } else {
        // Handle validation errors from the server
        Object.values(resData).forEach((err) => {
          toast.error(err);
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('An error occurred while logging in.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="organization-title">Educational Organization</h1>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please log in to continue</p>

        <div className="login-type-buttons">
          <button
            className={`login-type-button ${loginType === 'student' ? 'active' : ''}`}
            onClick={() => handleLoginTypeChange('student')}
          >
            Student Login
          </button>
          <button
            className={`login-type-button ${loginType === 'admin' ? 'active' : ''}`}
            onClick={() => handleLoginTypeChange('admin')}
          >
            Admin Login
          </button>
          <button
            className={`login-type-button ${loginType === 'teacher' ? 'active' : ''}`}
            onClick={() => handleLoginTypeChange('teacher')}
          >
            Teacher Login
          </button>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label className="form-label" htmlFor="email">Email</label>
          <input
            className="form-input"
            placeholder="Enter your Email"
            type="email"
            id="email"
            name="email"
            value={email} // Binding the input value to the state
            onChange={handleEmailChange} // Updating state on input change
            required
          />

          <label className="form-label" htmlFor="password">Password</label>
          <input
            className="form-input"
            placeholder="Enter your Password"
            type="password"
            id="password"
            name="password"
            value={password} // Binding the input value to the state
            onChange={handlePasswordChange} // Updating state on input change
            required
          />

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        <p className="info-text">
          Don't have an account? <a href="/create-account" className="create-account-link">Create one</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
