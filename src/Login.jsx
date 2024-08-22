import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [signupDetails, setSignupDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/studysignups'); 
      const users = response.data;
      const user = users.find(
        (userr) => userr.email === loginDetails.email && userr.password === loginDetails.password
      );
  
      if (user) {
        navigate('/FrontPage');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error.response || error.message); 
      setError('An error occurred. Please try again.');
    }
  };
  
  

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/studysignup', signupDetails);
      console.log('Signup successful:', response.data);
      setSignupDetails({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="auth-container">
        <div className="auth-buttons">
          <button
            className={`toggle-button ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-button ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>
        <div className="auth-form">
          {isLogin ? (
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginDetails.email}
                onChange={handleLoginChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginDetails.password}
                onChange={handleLoginChange}
                required
              />
              <button type="submit" className="submit-button">
                Login
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit}>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={signupDetails.firstname}
                onChange={handleSignupChange}
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={signupDetails.lastname}
                onChange={handleSignupChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupDetails.email}
                onChange={handleSignupChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupDetails.password}
                onChange={handleSignupChange}
                required
              />
              <button type="submit" className="submit-button">
                Signup
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
