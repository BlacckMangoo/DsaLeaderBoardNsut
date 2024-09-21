// src/components/Profile.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);
  const [codeforcesHandle, setCodeforcesHandle] = useState('');
  const [leetcodeHandle, setLeetcodeHandle] = useState('');
  const [codeforcesRating, setCodeforcesRating] = useState(0);
  const [leetcodeRating, setLeetcodeRating] = useState(0);

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const response = await fetch('/profile');
        if (response.ok) {
          const profileData = await response.json();
          setCodeforcesHandle(profileData.codeforces_handle || '');
          setLeetcodeHandle(profileData.leetcode_handle || '');
          setCodeforcesRating(profileData.codeforces_rating || 0);
          setLeetcodeRating(profileData.leetcode_rating || 0);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codeforces_handle: codeforcesHandle,
          leetcode_handle: leetcodeHandle,
          codeforces_rating: codeforcesRating,
          leetcode_rating: leetcodeRating,
        }),
      });
      if (response.ok) {
        // Handle success
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={codeforcesHandle} onChange={(e) => setCodeforcesHandle(e.target.value)} placeholder="Codeforces Handle" />
        <input type="text" value={leetcodeHandle} onChange={(e) => setLeetcodeHandle(e.target.value)} placeholder="LeetCode Handle" />
        <input type="number" value={codeforcesRating} onChange={(e) => setCodeforcesRating(e.target.value)} placeholder="Codeforces Rating" />
        <input type="number" value={leetcodeRating} onChange={(e) => setLeetcodeRating(e.target.value)} placeholder="LeetCode Rating" />
        <button type="submit">Update Profile</button>
      </form>
      <p>Total Score: {codeforcesRating + leetcodeRating}</p>
    </div>
  );
}

export default Profile;