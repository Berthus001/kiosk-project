import { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/home.css';

export default function Home() {
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await api.get('/health');
        setStatus('connected');
      } catch (err) {
        setError('Failed to connect to API');
        setStatus('error');
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to Project Kiosk</h1>
      <div className="status-card">
        <h2>API Status</h2>
        {status === 'loading' && <p>Checking connection...</p>}
        {status === 'connected' && <p className="success">API Connected ✓</p>}
        {status === 'error' && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
