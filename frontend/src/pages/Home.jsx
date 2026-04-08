import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import CategoryBar from '../components/CategoryBar';
import ProductCard from '../components/ProductCard';
import AuthRequiredModal from '../components/AuthRequiredModal';
import { PRODUCTS } from '../utils/products';
import '../styles/home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);
  const navigate = useNavigate();

  const filteredProducts = selectedCategory
    ? PRODUCTS.filter((p) => p.category === selectedCategory)
    : PRODUCTS;

  const handleAddToCart = (product) => {
    if (!user) {
      setPendingProduct(product);
      setShowAuthModal(true);
    } else {
      // User is authenticated, add to cart
      navigate('/kiosk');
    }
  };

  const handleAuthModalAction = (action) => {
    setShowAuthModal(false);
    if (action === 'login') {
      navigate('/login');
    } else if (action === 'signup') {
      navigate('/signup');
    }
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="home-header-content">
          <div className="home-brand">
            <h1>🏪 Kiosk Menu</h1>
            <p>Browse and order your favorite items</p>
          </div>
          <div className="home-actions">
            {user ? (
              <div className="user-section">
                <span className="user-greeting">Welcome, {user.name}!</span>
                <button className="view-orders-btn" onClick={() => navigate('/kiosk')}>
                  View Orders
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <button
                  className="login-link-btn"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
                <button
                  className="signup-link-btn"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <CategoryBar 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      {/* Main Content */}
      <main className="home-main">
        <div className="products-section">
          <h2 className="section-title">
            {selectedCategory 
              ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
              : 'All Products'}
          </h2>

          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isPlaceholder={false}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))
            ) : (
              <div className="no-products">
                <p>No products available in this category</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Auth Required Modal */}
      {showAuthModal && (
        <AuthRequiredModal
          onLogin={() => handleAuthModalAction('login')}
          onSignUp={() => handleAuthModalAction('signup')}
          onClose={() => {
            setShowAuthModal(false);
            setPendingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Home;
