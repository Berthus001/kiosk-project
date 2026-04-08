import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-container">
        <h1 className="landing-title">Welcome to Kiosk System</h1>
        <p className="landing-subtitle">Browse our menu and place your order</p>
        
        <button 
          className="start-ordering-btn"
          onClick={() => navigate('/menu')}
        >
          Start Ordering
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
