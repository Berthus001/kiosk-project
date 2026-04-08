import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CategoryBar from '../components/CategoryBar';
import ProductGrid from '../components/ProductGrid';
import CartSidebar from '../components/CartSidebar';
import '../styles/kioskPage.css';

const KioskPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="kiosk-page">
      <Navbar onCartClick={toggleCart} />

      <div className="kiosk-header">
        <h1>Menu</h1>
      </div>

      <CategoryBar 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      <div className="kiosk-main">
        <ProductGrid category={selectedCategory} />
      </div>

      {/* Floating Cart Button */}
      <button
        className="floating-cart-btn"
        onClick={toggleCart}
        title="Open cart"
      >
        🛒
      </button>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default KioskPage;
