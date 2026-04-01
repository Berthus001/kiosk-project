import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getTotalItemCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartCount = getTotalItemCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2 className="navbar-title">🏪 Kiosk System</h2>
        </div>

        <div className="navbar-content">
          {user && (
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className={`user-role ${user.role}`}>{user.role}</span>
            </div>
          )}

          {user?.role === 'user' && (
            <div className="cart-badge">
              <span className="cart-count">{cartCount}</span>
              🛒
            </div>
          )}

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
