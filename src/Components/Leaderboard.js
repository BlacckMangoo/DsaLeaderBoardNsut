import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth
import './Leaderboard.css';

function Leaderboard() {
  const { user } = useAuth(); // Get the current user

  // Placeholder leaderboard data
  const leaderboardData = [
    { rank: 1, name: user?.name || 'Anonymous', rollNumber: user?.email || 'N/A', dsaScore: user?.dsaScore || 0 },
    // Add more placeholder entries if needed
  ];

  return (
    <div className="leaderboard-container">
      <h1>DSA Leaderboard</h1>
      {leaderboardData.length > 0 ? (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={index}>
                <td>{user.rank}</td>
                <td>{user.name}</td>
                <td>{user.rollNumber}</td>
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