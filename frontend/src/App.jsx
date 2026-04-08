import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
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
            {/* Default route redirects to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

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

            {/* User/Kiosk page */}
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
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

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
