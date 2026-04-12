import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/cartBadge.css';

/**
 * CartBadge Component
 * Displays the number of items in cart as a small badge
 * Can be placed in Navbar or header
 */
const CartBadge = () => {
  const { getTotalItemCount } = useContext(CartContext);
  const itemCount = getTotalItemCount();

  if (itemCount === 0) {
    return null; // Don't show badge if cart is empty
  }

  return (
    <div className="cart-badge">
      <span className="badge-icon">🛒</span>
      <span className="badge-count">{itemCount}</span>
    </div>
  );
};

export default CartBadge;
