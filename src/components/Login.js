import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import { useAuth } from '../AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSuccess = (user) => {
    console.log('Login successful:', user);
    try {
      login(user);
      navigate('/profile');
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleGoogleLoginSuccess = (googleUser) => {
    console.log('Google login successful:', googleUser);
    handleLoginSuccess(googleUser);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Attempting email login with:', { email, name });
    setError(''); // Clear any previous errors

    if (email.endsWith('@nsut.ac.in')) {
      handleLoginSuccess({ email, name, dsaScore: 0 }); // Initialize dsaScore to 0
    } else {
      console.warn('Invalid email domain:', email);
      setError('Please use your NSUT email to login.');
    }
  };

  return (
    <div className="login-container">
      <h1>Sign in</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="login-options">
        <div className="google-login">
          <h2>Sign in with Google</h2>
          <GoogleLogin onLoginSuccess={handleGoogleLoginSuccess} />
        </div>
        <div className="divider">OR</div>
        <div className="email-login">
          <h2>Sign in with Email</h2>
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Enter your NSUT email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button type="submit">Sign In with Email</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;