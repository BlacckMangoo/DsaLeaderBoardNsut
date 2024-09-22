import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function GoogleLogin({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Memoize the function to prevent it from being recreated on every render
  const initializeGoogleSignIn = useCallback(() => {
    if (window.google) {
      try {
        window.google.accounts.id.initialize({
          client_id: '903643545169-tp7412gj0knhg9ec8cfvjh0ho1tlqknb.apps.googleusercontent.com', // Replace with your actual Google Client ID
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          { theme: 'outline', size: 'large' }
        );
        window.google.accounts.id.prompt();
      } catch (error) {
        console.error("Error initializing Google Sign-In:", error);
        setError("Failed to initialize Google Sign-In");
      }
    } else {
      console.error("Google Sign-In script not loaded");
      setError("Google Sign-In not available");
    }
  }, []);

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = initializeGoogleSignIn; // Call the memoized function
      script.onerror = () => setError("Failed to load Google Sign-In script");
    };

    loadGoogleScript();
  }, [initializeGoogleSignIn]); // Add initializeGoogleSignIn as a dependency

  const handleCredentialResponse = (response) => {
    console.log("Received credential response:", response);
    if (response.credential) {
      const token = response.credential;
      // Decode the JWT token
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const { email, name } = JSON.parse(jsonPayload);

      if (email.endsWith('@nsut.ac.in')) {
        onLoginSuccess({ email, name });
        navigate('/profile');
      } else {
        setError('Please use your NSUT email to login.');
      }
    } else {
      console.error("No credential received in response");
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <div id="googleSignInButton"></div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default GoogleLogin;