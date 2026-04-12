import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import { CartContext } from '../context/CartContext';
import API from '../utils/api';
import '../styles/productGrid.css';

const DynamicProductSection = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]); // Defaults to empty array
  const [loading, setLoading] = useState(true);

  // Fetch products only once on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch from API endpoint
        const response = await fetch(API.ENDPOINTS.PRODUCTS, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          // Set timeout
          signal: AbortSignal.timeout(10000)
        });

        // Check if response is OK (200-299 status)
        if (!response.ok) {
          throw new Error(`API error: Status ${response.status}`);
        }

        const data = await response.json();

        // Validate data is an array
        if (!Array.isArray(data)) {
          console.warn('API did not return an array, using empty array');
          setProducts([]);
          return;
        }

        // Success: set the products
        setProducts(data);
      } catch (err) {
        // Graceful error handling - log error but don't crash
        console.error('Failed to fetch products:', err.message);
        
        // Silently fail: keep products as empty array (no error display)
        // This allows the page to render "No products yet" instead of crashing
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array - fetch once on mount

  const handleAddToCart = (product) => {
    if (product && product.id) {
      addToCart(product);
    }
  };

  // Loading state - show spinner only while fetching
  if (loading) {
    return (
      <section className="products-section">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-loading">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  // Empty or error state (graceful degradation)
  // Shows "No products yet" for both API errors and empty product lists
  if (products.length === 0) {
    return (
      <section className="products-section">
        <h2 className="section-title">Featured Products</h2>
        <div className="empty-state">
          <p>No products yet</p>
        </div>
      </section>
    );
  }

  // Render products successfully
  return (
    <section className="products-section">
      <h2 className="section-title">Featured Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </section>
  );
};

export default DynamicProductSection;
