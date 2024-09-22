import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to NSUT DSA Leaderboard</h2>
      <nav>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/leaderboard">View Leaderboard</Link>
      </nav>
    </div>
  );
}

export default Home;

