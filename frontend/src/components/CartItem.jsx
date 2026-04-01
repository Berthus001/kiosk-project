import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/cartItem.css';

const CartItem = ({ item }) => {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useContext(CartContext);

  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="cart-item-details">
        <h4>{item.title}</h4>
        <p className="item-price">${item.price}</p>
      </div>

      <div className="cart-item-quantity">
        <button
          className="qty-btn"
          onClick={() => decreaseQuantity(item.id)}
          disabled={item.quantity <= 1}
        >
          −
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => increaseQuantity(item.id)}
        >
          +
        </button>
      </div>

      <div className="cart-item-total">
        ${itemTotal.toFixed(2)}
      </div>

      <button
        className="remove-btn"
        onClick={() => removeFromCart(item.id)}
        title="Remove from cart"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;
