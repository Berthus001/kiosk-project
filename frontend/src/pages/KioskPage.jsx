import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import CartSidebar from '../components/CartSidebar';
import '../styles/kioskPage.css';

const KioskPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="kiosk-page">
      <Navbar />

      <div className="kiosk-main">
        <ProductGrid />
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
