import React, { useState } from 'react';
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

  return (
  
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/login" 
              element={
                <Login 
                  setIsAuthenticated={setIsAuthenticated} 
                  setUser={setUser} 
                />
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