import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';  // Import the Home component
import Login from './Components/Login';
import Leaderboard from './Components/Leaderboard';
import './App.css';

function App() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  const addUser = (user) => {
    const updatedLeaderboard = [...leaderboardData, user].sort((a, b) => b.dsaScore - a.dsaScore);
    updatedLeaderboard.forEach((user, index) => {
      user.rank = index + 1;
    });
    setLeaderboardData(updatedLeaderboard);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DSA Leaderboard</h1>
        </header>
        <main className="App-content">
          <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login addUser={addUser} />} />
            <Route path="/leaderboard" element={<Leaderboard leaderboardData={leaderboardData} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
