import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

// Create authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to restore user from localStorage', e);
      }
    }

    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.post('/users/login', {
        username,
        password
      });

      const { user: userData, token } = res.data;

      setUser(userData);

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', token);

      console.log(userData);

      return true;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      const res = await api.post('/users/signup', userData);
      console.log(res);
      const { user, token } = res.data;

      setUser(user);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', token);

      return true;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};







// import React, { createContext, useState, useEffect } from 'react';

// // Create authentication context
// export const AuthContext = createContext();

// // Mock users database
// const MOCK_USERS = {
//   admin: {
//     id: 1,
//     username: 'admin',
//     password: 'admin123',
//     role: 'admin',
//     name: 'Admin User'
//   },
//   user: {
//     id: 2,
//     username: 'user',
//     password: 'user123',
//     role: 'user',
//     name: 'Regular User'
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Restore user from localStorage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (e) {
//         console.error('Failed to restore user from localStorage', e);
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = (username, password) => {
//     // Mock authentication
//     const mockUser = Object.values(MOCK_USERS).find(
//       (u) => u.username === username && u.password === password
//     );

//     if (mockUser) {
//       const userData = {
//         id: mockUser.id,
//         username: mockUser.username,
//         role: mockUser.role,
//         name: mockUser.name
//       };
//       setUser(userData);
//       localStorage.setItem('user', JSON.stringify(userData));
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     isAuthenticated: !!user
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
