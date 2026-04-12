import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import KioskPage from './pages/KioskPage';
import './styles/app.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          {/* Landing page - welcome page */}
          <Route path="/" element={<LandingPage />} />

          {/* Menu page - product browsing */}
          <Route path="/menu" element={<MenuPage />} />

          {/* Kiosk page - main ordering interface */}
          <Route path="/kiosk" element={<KioskPage />} />

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
