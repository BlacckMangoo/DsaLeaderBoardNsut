import React from 'react';
import { Link } from 'react-router-dom';
import './Leaderboard.css';

function Leaderboard({ leaderboardData }) {
  return (
    <div className="leaderboard-container">
      <h1>DSA Leaderboard</h1>
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
      <Link to="/" className="back-button">Back To Home page</Link>
    </div>
  );
}

export default Leaderboard;