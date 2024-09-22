import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Profile.css';

function Profile() {
  const [dsaScore, setDsaScore] = useState('');
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, dsaScore: parseInt(dsaScore, 10) };
    login(updatedUser);

    // Update leaderboard data in localStorage
    const storedData = localStorage.getItem('leaderboardData');
    let leaderboardData = storedData ? JSON.parse(storedData) : [];
    const existingUserIndex = leaderboardData.findIndex(item => item.email === user.email);
    if (existingUserIndex !== -1) {
      leaderboardData[existingUserIndex] = updatedUser;
    } else {
      leaderboardData.push(updatedUser);
    }
    localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));

    navigate('/leaderboard');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="profile-container">
      <h1>Enter Your DSA Score</h1>
      <form onSubmit={handleSubmit} className="profile-form">
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
        <button type="submit" className="submit-button">Save Score</button>
      </form>
    </div>
  );
}

export default Profile;