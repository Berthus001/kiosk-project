import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import CategoryBar from '../components/CategoryBar';
import AuthRequiredModal from '../components/AuthRequiredModal';
import API from '../utils/api';
import '../styles/menuPage.css';

const MenuPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);

  // Fetch products from backend API
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

        console.log("API RESPONSE:", data);

        // extract products safely
        const productsArray = data.data || data.products || data;

        if (!Array.isArray(productsArray)) {
          throw new Error('API did not return a valid products array');
        }

        setProducts(productsArray);
        setFilteredProducts(productsArray);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        console.error('Products fetch error:', err);
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
    if (!user) {
      setPendingProduct(product);
      setShowAuthModal(true);
    } else {
      // User is authenticated, navigate to kiosk with product
      navigate('/kiosk', { state: { productToAdd: product } });
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

  // Loading state
  if (loading) {
    return (
      <div className="menu-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="menu-page">
        <div className="error-container">
          <h2>Error Loading Products</h2>
          <p>{error}</p>
          <button 
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      {/* Header */}
      <header className="menu-header">
        <h1>Our Menu</h1>
        <button 
          className="back-btn"
          onClick={() => navigate('/')}
        >
          ← Back
        </button>
      </header>

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
                // <ProductCard key={product._id || product.id} product={product} />
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

export default MenuPage;
