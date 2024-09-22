import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ addUser }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [dsaScore, setDsaScore] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { 
      email, 
      name, 
      rollNumber,
      dsaScore: parseInt(dsaScore, 10) 
    };
    addUser(newUser);
    navigate('/leaderboard');
  };

  return (
    <div className="login-container">
      <h1>DSA Leaderboard Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number:</label>
          <input
            type="text"
            id="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dsaScore">DSA Score:</label>
          <input
            type="number"
            id="dsaScore"
            value={dsaScore}
            onChange={(e) => setDsaScore(e.target.value)}
            required
            min="0"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;