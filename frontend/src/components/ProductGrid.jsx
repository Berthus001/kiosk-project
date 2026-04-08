import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import API from '../utils/api';
import '../styles/productGrid.css';

const ProductGrid = ({ category, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(API.ENDPOINTS.PRODUCTS);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('API did not return an array of products');
        }

        // Filter by category if provided
        const filtered = category
          ? data.filter((p) => p.category === category)
          : data;

        setProducts(filtered);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        console.error('Products fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Loading state
  if (loading) {
    return (
      <div className="product-grid-container">
        <div className="empty-state">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="product-grid-container">
        <div className="empty-state">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  // No products state
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
          <ProductCard 
            key={product.id} 
            product={product} 
            isPlaceholder={false}
            onAddToCart={onAddToCart ? () => onAddToCart(product) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
