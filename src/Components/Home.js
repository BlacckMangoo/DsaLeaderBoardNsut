import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Home.css';

function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <h2>Welcome to NSUT DSA Leaderboard</h2>
      <nav>
        {user ? (
          <>
            <Link to="/profile">Update Profile</Link>
            <br />
            <Link to="/leaderboard">View Leaderboard</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/leaderboard">View Leaderboard</Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Home;