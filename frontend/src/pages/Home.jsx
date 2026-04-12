import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DynamicProductSection from '../components/DynamicProductSection';
import CartSidebar from '../components/CartSidebar';
import '../styles/home.css';

const Home = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="home-page">
      {/* Static Navbar - Always loaded, never changes */}
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* Static Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Kiosk</h1>
          <p className="hero-subtitle">Discover our delicious menu items</p>
        </div>
      </section>

      {/* ONLY Dynamic Section - Fetches products from API */}
      <main className="home-main">
        <DynamicProductSection />
      </main>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      {/* Static Footer */}
      <footer className="footer">
        <p>&copy; 2026 Kiosk System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
