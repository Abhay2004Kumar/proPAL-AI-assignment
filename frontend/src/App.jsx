import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Agent from './pages/Agent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); // Add loading state

  // 🔐 Auto-login on app load
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setAuthChecked(true); // Mark auth check as complete
  }, []);

  // Don't render routes until we've checked auth state
  if (!authChecked) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login 
                setIsAuthenticated={setIsAuthenticated} 
                setUser={setUser} 
              />
            )
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <Dashboard user={user} setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="agent" element={<Agent />} />
          <Route index element={<Navigate to="profile" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;