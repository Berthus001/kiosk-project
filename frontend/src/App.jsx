import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import KioskPage from './pages/KioskPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/app.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Landing page - public access */}
            <Route path="/" element={<Home />} />

            {/* Login route */}
            <Route path="/login" element={<Login />} />

            {/* Signup route */}
            <Route path="/signup" element={<Signup />} />

            {/* Dashboard - routes to different pages based on role */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  element={
                    <RoleBasedDashboard />
                  }
                />
              }
            />

            {/* User/Kiosk page - authenticated users only */}
            <Route
              path="/kiosk"
              element={
                <ProtectedRoute
                  element={<KioskPage />}
                  requiredRole="user"
                />
              }
            />

            {/* Admin page */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  element={<AdminPage />}
                  requiredRole="admin"
                />
              }
            />

            {/* Catch-all for undefined routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

/**
 * RoleBasedDashboard Component
 * Routes to the appropriate dashboard based on user role
 */
function RoleBasedDashboard() {
  return (
    <ProtectedRoute
      element={
        <CheckROleAndRoute />
      }
    />
  );
}

/**
 * CheckROleAndRoute Component
 * Actual role checking component
 */
function CheckROleAndRoute() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  } else if (user.role === 'user') {
    return <Navigate to="/kiosk" replace />;
  }

  return <Navigate to="/login" replace />;
}

export default App;
