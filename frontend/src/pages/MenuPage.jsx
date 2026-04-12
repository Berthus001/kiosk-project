import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import CategoryBar from '../components/CategoryBar';
import CartSidebar from '../components/CartSidebar';
import API from '../utils/api';
import '../styles/menuPage.css';

const MenuPage = () => {
  const navigate = useNavigate();
  const { addToCart, getTotalItemCount } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = getTotalItemCount();

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(API.ENDPOINTS.PRODUCTS, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          signal: AbortSignal.timeout(10000)
        });
        
        if (!response.ok) {
          throw new Error(`API error: Status ${response.status}`);
        }

        const data = await response.json();

        // Validate we have an array
        if (!Array.isArray(data)) {
          console.warn('API did not return an array, using empty array');
          setProducts([]);
          setFilteredProducts([]);
          return;
        }

        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        // Graceful error handling - page still renders with empty state
        console.error('Products fetch error:', err.message);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category when selectedCategory or products change
  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(
        products.filter((p) => p.category === selectedCategory)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="menu-page">
      {/* Header */}
      <header className="menu-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/')}
        >
          ← Back
        </button>
        <h1>Our Menu</h1>
        <button 
          className="menu-cart-btn"
          onClick={() => setIsCartOpen(true)}
          title="Open cart"
          aria-label={`Cart with ${cartCount} items`}
        >
          <span className="cart-badge-count">{cartCount}</span>
          🛒
        </button>
      </header>

      {/* Loading state - only for product grid */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      )}

      {/* Show category filter and products only when NOT loading */}
      {!loading && (
        <>
          {/* Category Filter */}
          <CategoryBar 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />

          {/* Main Content */}
          <main className="menu-main">
            {filteredProducts.length > 0 ? (
              <div className="products-section">
                <h2 className="section-title">
                  {selectedCategory 
                    ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
                    : 'All Products'}
                </h2>

                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isPlaceholder={false}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <p>
                  {selectedCategory 
                    ? `No products available in ${selectedCategory}`
                    : 'No products available'}
                </p>
                {selectedCategory && (
                  <button 
                    className="clear-filter-btn"
                    onClick={() => setSelectedCategory(null)}
                  >
                    View All Products
                  </button>
                )}
              </div>
            )}
          </main>
        </>
      )}

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
};

export default MenuPage;
