import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Leaderboard.css';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load leaderboard data from localStorage
    const storedData = localStorage.getItem('leaderboardData');
    let data = storedData ? JSON.parse(storedData) : [];

    // Update or add current user's data
    if (user && user.dsaScore !== undefined) {
      const existingUserIndex = data.findIndex(item => item.email === user.email);
      if (existingUserIndex !== -1) {
        data[existingUserIndex] = { ...user };
      } else {
        data.push(user);
      }
    }

    // Sort and assign ranks
    data.sort((a, b) => b.dsaScore - a.dsaScore);
    data = data.map((item, index) => ({ ...item, rank: index + 1 }));

    // Update state and localStorage
    setLeaderboardData(data);
    localStorage.setItem('leaderboardData', JSON.stringify(data));
  }, [user]);

  return (
    <div className="leaderboard-container">
      <h1>DSA Leaderboard</h1>
      {leaderboardData.length > 0 ? (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Email</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={index}>
                <td>{user.rank}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.dsaScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leaderboard data available at the moment.</p>
      )}
      <Link to="/" className="back-button">Back To Home page</Link>
    </div>
  );
}

export default Leaderboard;