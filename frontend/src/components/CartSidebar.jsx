import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';
import '../styles/cartSidebar.css';

const CartSidebar = ({ isOpen, onClose }) => {
  const {
    cartItems,
    calculateTotal,
    clearCart,
    checkout
  } = useContext(CartContext);

  const total = calculateTotal();
  const itemCount = cartItems.length;

  const handleCheckout = () => {
    checkout();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="cart-backdrop" onClick={onClose}></div>
      )}

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>🛒 Your Cart</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <span>Start shopping to add items</span>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Items:</span>
                <span>{itemCount}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-actions">
              <button onClick={handleCheckout} className="checkout-btn">
                ✓ Checkout
              </button>
              <button onClick={clearCart} className="clear-cart-btn">
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
