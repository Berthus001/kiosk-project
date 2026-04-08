import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/productCard.css';

const ProductCard = ({ product, isPlaceholder, onAddToCart }) => {
  const { addToCart } = useContext(CartContext);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddToCart = () => {
    if (product && product.id) {
      // If onAddToCart callback is provided (from MenuPage or landing), use it
      if (onAddToCart) {
        onAddToCart(product);
      } else {
        // Otherwise, add directly to cart (kiosk page behavior)
        addToCart(product);
        
        // Show visual feedback
        setAddedFeedback(true);
        setTimeout(() => setAddedFeedback(false), 1500);
      }
    }
  };

  if (isPlaceholder) {
    return (
      <div className="product-card placeholder">
        <div className="product-image-wrapper placeholder">
          <div className="placeholder-image" />
        </div>

        <div className="product-details">
          <h3 className="product-title placeholder" />
          <p className="product-price placeholder" />
          <button
            disabled
            className="add-to-cart-btn disabled"
            title="Awaiting products"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }

  // This branch handles real product data once backend is connected
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        ) : (
          <div className="product-no-image">No Image</div>
        )}
      </div>

      <div className="product-details">
        <h3 className="product-title">{product.title || product.name}</h3>
        <p className="product-price">${(product.price || 0).toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className={`add-to-cart-btn ${addedFeedback ? 'added' : ''}`}
          title="Add to cart"
        >
          {addedFeedback ? '✓ Added!' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
