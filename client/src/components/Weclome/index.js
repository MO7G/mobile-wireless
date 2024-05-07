import React from 'react';
import './index.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';

const Welcome = ({ isAuthenticated }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className="welcome-container">
      <h1>Welcome to the City Parking Simulator</h1>
      <p>This website allows you to experience the city's parking system in real-time.</p>
      <div className="button-container-welcome">
        {/* Conditionally render login button if not authenticated */}
        {!isAuthenticated && (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}

        {/* Conditionally render dashboard button if authenticated */}
        {isAuthenticated && (
          <button className="dashboard-btn" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        )}
        
        {/* Always render simulator button */}
        <button className="simulator-btn" onClick={() => navigate("/Simulator")}>
          Real-Time Simulator
        </button>
      </div>
    </div>
  );
};

export default Welcome;
