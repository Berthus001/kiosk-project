import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/productCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
    // Visual feedback
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>

      <div className="product-details">
        <h3 className="product-title">{product.title}</h3>

        <p className="product-description">{product.description}</p>

        <div className="product-price">
          Price: <span className="price-amount">${product.price}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="add-to-cart-btn"
          title="Add to cart"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
