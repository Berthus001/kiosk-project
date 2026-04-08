import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';
import '../styles/cartSidebar.css';

const CartSidebar = ({ isOpen, onClose }) => {
  const {
    cartItems,
    calculateTotal,
    clearCart,
    submitCheckout
  } = useContext(CartContext);

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const total = calculateTotal();
  const itemCount = cartItems.length;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setCheckoutLoading(true);
    setCheckoutError('');
    setCheckoutSuccess(false);

    try {
      await submitCheckout('/api/orders');
      setCheckoutSuccess(true);
      
      // Show success message for 2 seconds then close sidebar
      setTimeout(() => {
        setCheckoutSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Checkout failed:', error);
      setCheckoutError(
        error.message || 'Checkout failed. Please try again.'
      );
      setCheckoutLoading(false);
    }
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
          {checkoutSuccess && (
            <div className="checkout-success">
              <div className="success-icon">✓</div>
              <p>Order placed successfully!</p>
            </div>
          )}

          {checkoutError && (
            <div className="checkout-error">
              <p>{checkoutError}</p>
            </div>
          )}

          {cartItems.length === 0 && !checkoutSuccess ? (
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

        {cartItems.length > 0 && !checkoutSuccess && (
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
              <button
                onClick={handleCheckout}
                className="checkout-btn"
                disabled={checkoutLoading || cartItems.length === 0}
              >
                {checkoutLoading ? '⏳ Processing...' : '✓ Checkout'}
              </button>
              <button
                onClick={clearCart}
                className="clear-cart-btn"
                disabled={checkoutLoading}
              >
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
