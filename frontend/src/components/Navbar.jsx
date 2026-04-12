import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/navbar.css';

const Navbar = ({ onCartClick }) => {
  const { getTotalItemCount } = useContext(CartContext);

  const cartCount = getTotalItemCount();

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2 className="navbar-title">🏪 Kiosk System</h2>
        </div>

        <div className="navbar-content">
          <button
            className="cart-badge"
            onClick={handleCartClick}
            title="Open cart"
            aria-label={`Cart with ${cartCount} items`}
          >
            <span className="cart-count">{cartCount}</span>
            🛒
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
