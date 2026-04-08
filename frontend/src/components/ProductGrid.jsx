import React from 'react';
import ProductCard from './ProductCard';
import '../styles/productGrid.css';

const ProductGrid = ({ category }) => {
  // When backend is ready, fetch products by category
  // For now, show empty state immediately - no placeholders
  const products = []; // Will be populated from backend
  const isLoading = false; // Will be true when actively fetching

  // No loading state shown - empty state displayed immediately
  if (products.length === 0) {
    return (
      <div className="product-grid-container">
        <div className="empty-state">
          <p>No products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isPlaceholder={false} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
