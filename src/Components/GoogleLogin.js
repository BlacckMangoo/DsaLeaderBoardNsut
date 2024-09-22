import React, { useEffect, useState, useCallback } from 'react';

function GoogleLogin({ onLoginSuccess }) {
  const [error, setError] = useState(null);

  const initializeGoogleSignIn = useCallback(() => {
    if (window.google) {
      try {
        window.google.accounts.id.initialize({
          client_id: '903643545169-tp7412gj0knhg9ec8cfvjh0ho1tlqknb.apps.googleusercontent.com',
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

      script.onload = initializeGoogleSignIn;
      script.onerror = () => setError("Failed to load Google Sign-In script");
    };

    loadGoogleScript();
  }, [initializeGoogleSignIn]);

  const handleCredentialResponse = (response) => {
    if (response.credential) {
      const token = response.credential;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const { email, name } = JSON.parse(jsonPayload);

      if (email.endsWith('@nsut.ac.in')) {
        onLoginSuccess({ email, name });
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