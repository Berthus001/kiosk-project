# 🏪 Project Kiosk - Modern React Frontend

A modern, touch-friendly kiosk-style web application built with React, featuring role-based access control, dynamic product display, and a complete client-side cart system.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation & Running

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will be available at `http://localhost:5173`

---

## 📋 Demo Credentials

| Role  | Username | Password  |
|-------|----------|-----------|
| Admin | `admin`  | `admin123` |
| User  | `user`   | `user123` |

---

## ✨ Features

### 1. Authentication & Authorization
- ✅ Mock authentication system (no backend required)
- ✅ Persistent login using localStorage
- ✅ Role-based access control (Admin & User roles)
- ✅ Automatic session recovery on page reload
- ✅ Secure logout functionality

### 2. Role-Based Dashboards

#### Admin Dashboard
- 📊 View all products
- ➕ Add new products
- ✎ Edit existing products
- 🗑 Delete products
- Dashboard-style table layout
- Form validation

#### User/Kiosk Page
- 🏪 Browse products from FakeStore API
- 📦 Dynamic product grid layout
- 🛒 Add products to cart
- 🎯 Touch-friendly interface
- Large, readable buttons
- Responsive design

### 3. Client-Side Cart System
- ✅ Add/Remove items
- ✅ Adjust quantities
- ✅ Calculate totals automatically
- ✅ Prevent negative quantities
- ✅ Prevent duplicate items (increases quantity instead)
- ✅ Cart persistence with localStorage
- ✅ Checkout simulation with console logging
- ✅ Cart sidebar with smooth animations
- ✅ Floating cart button with item count badge

### 4. Product Management
- 📡 Fetch products from https://fakestoreapi.com/products
- 🔄 Dynamic product rendering
- ⚠️ Error handling with retry options
- ⏳ Loading states with spinner
- 📱 Touch-friendly product cards
- Image display with fallback

### 5. UI/UX Features
- 🎨 Modern gradient designs
- 📱 Fully responsive (desktop, tablet, mobile)
- 🖱️ Touch-optimized buttons (min 44-56px)
- ♿ Accessible form inputs
- 🎯 Smooth animations and transitions
- 🌈 Color-coded status indicators
- Dark navbar with branding

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.jsx              # Authentication form
│   │   ├── Navbar.jsx             # Navigation bar with user info
│   │   ├── ProductGrid.jsx        # Grid display of products
│   │   ├── ProductCard.jsx        # Individual product card
│   │   ├── AdminDashboard.jsx     # Admin product management
│   │   ├── CartSidebar.jsx        # Cart display modal
│   │   ├── CartItem.jsx           # Individual cart item row
│   │   └── ProtectedRoute.jsx     # Route protection HOC
│   │
│   ├── context/
│   │   ├── AuthContext.jsx        # Auth state management
│   │   └── CartContext.jsx        # Cart state management
│   │
│   ├── pages/
│   │   ├── Home.jsx               # Original home page
│   │   ├── KioskPage.jsx          # User shopping page
│   │   └── AdminPage.jsx          # Admin dashboard page
│   │
│   ├── styles/
│   │   ├── app.css                # Global app styles
│   │   ├── login.css              # Login page styles
│   │   ├── navbar.css             # Navbar styles
│   │   ├── productGrid.css        # Grid layout styles
│   │   ├── productCard.css        # Product card styles
│   │   ├── cartSidebar.css        # Cart sidebar styles
│   │   ├── cartItem.css           # Cart item styles
│   │   ├── adminDashboard.css     # Admin styles
│   │   ├── kioskPage.css          # Kiosk page styles
│   │   ├── adminPage.css          # Admin page styles
│   │   └── home.css               # Home page styles
│   │
│   ├── App.jsx                    # Main app with routing
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global reset styles
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔄 State Management

### AuthContext
Manages authentication state globally:
- `user` - Current user object or null
- `isAuthenticated` - Boolean flag
- `loading` - Initial load state
- `login(username, password)` - Authenticate user
- `logout()` - Clear authentication

```javascript
// Usage
const { user, login, logout, isAuthenticated } = useContext(AuthContext);
```

### CartContext
Manages shopping cart globally:
- `cartItems` - Array of items in cart
- `addToCart(product)` - Add item or increase quantity
- `removeFromCart(productId)` - Remove item completely
- `updateQuantity(productId, quantity)` - Set specific quantity
- `increaseQuantity(productId)` - Increment by 1
- `decreaseQuantity(productId)` - Decrement by 1
- `calculateTotal()` - Get cart total price
- `getTotalItemCount()` - Get total items
- `clearCart()` - Empty entire cart
- `checkout()` - Simulate purchase

```javascript
// Usage
const { cartItems, addToCart, calculateTotal } = useContext(CartContext);
```

---

## 🛣️ Routing Structure

```
/ (root) → redirects to /dashboard
├── /login - Authentication page
├── /dashboard - Role-based redirect
│   ├── → /admin (if admin role)
│   └── → /kiosk (if user role)
├── /admin - Admin dashboard (protected)
├── /kiosk - User shopping page (protected)
└── /* - Catch-all redirects to /dashboard
```

---

## 💾 LocalStorage Persistence

The application uses localStorage for state persistence:

### Stored Data
```javascript
// User session
localStorage.setItem('user', JSON.stringify(userData))

// Cart items
localStorage.setItem('cart', JSON.stringify(cartItems))
```

### Recovery
- User session restored on app initialization
- Cart items recovered on page reload
- Automatic sync on state changes

---

## 🎨 Design System

### Colors
- Primary: `#667eea` (Purple-Blue)
- Secondary: `#764ba2` (Dark Purple)
- Success: `#27ae60` (Green)
- Danger: `#e74c3c` (Red)
- Background: `#f8f9fa` (Light Gray)

### Typography
- Font: Segoe UI, Tahoma, Geneva
- H1: 36-48px, weight 700
- H2: 22-32px, weight 700
- Body: 14-16px, weight 400-600

### Spacing
- Small: 8px
- Medium: 16px
- Large: 24px
- XL: 40px

### Touch Targets
- Minimum 44px height (mobile)
- Minimum 50px height (tablet)
- Large buttons for kiosk mode

---

## 📊 Component Breakdown

### Login Component
- Form validation
- Mock authentication
- Error messages
- Demo credentials display
- Loading state management

### Navbar Component
- User information display
- Role badge
- Cart item counter
- Logout button
- Sticky positioning

### ProductGrid Component
- API data fetching
- Loading spinner
- Error handling with retry
- Responsive grid layout
- 4 products per row (desktop)
- 3 products per row (tablet)
- 2 products per row (mobile)

### ProductCard Component
- Image display
- Product title & description
- Price formatting
- Add to cart functionality
- Hover effects & animations

### AdminDashboard Component
- Product CRUD operations
- Modal form handling
- Table display
- Add, Edit, Delete actions
- Form validation
- Confirmation dialogs

### CartSidebar Component
- Modal overlay
- Cart item list rendering
- Cart summary
- Checkout & clear buttons
- Smooth slide animation
- Empty state message

### CartItem Component
- Product image & details
- Quantity controls (+ / -)
- Item total calculation
- Remove button
- Disabled state when quantity is 1

### ProtectedRoute Component
- Authentication check
- Role verification
- Redirect logic
- Loading state handling

---

## 🔐 Security Notes

### Current Implementation
- Mock authentication only (for development)
- No actual API calls for auth
- Credentials stored in application code
- LocalStorage used (accessible via console)

### For Production
- Implement real authentication (JWT, OAuth, etc.)
- Secure backend API
- HTTP-only cookies for auth tokens
- HTTPS only
- CORS configuration
- Rate limiting
- Input validation & sanitization

---

## 🐛 Error Handling

### Data Fetching
```javascript
try {
  // Fetch from API
} catch (err) {
  // Display error message
  // Provide retry button
}
```

### Form Validation
```javascript
// Check required fields
// Validate input types
// Show error messages
```

### Cart Operations
```javascript
// Prevent negative quantities
// Prevent duplicate items
// Handle quantity updates gracefully
```

---

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

All components are optimized for touch interaction on mobile devices.

---

## 🔧 Development Features

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Browser DevTools
- React DevTools extension recommended
- Redux/Context DevTools for state inspection
- Network tab for API calls (FakeStore API)
- Application tab for localStorage inspection

---

## 🚀 Performance Optimizations

- ✅ Component-based architecture
- ✅ React hooks for minimal re-renders
- ✅ CSS modules for scoped styling
- ✅ Image lazy loading
- ✅ Efficient state management
- ✅ Debounced event handlers

---

## 🎯 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Android Chrome)

---

## 📝 Common Issues & Solutions

### Cart not persisting?
- Check browser's localStorage is enabled
- Check DevTools → Application → LocalStorage
- Clear cache and reload

### Products not loading?
- Check internet connection
- Verify FakeStore API is accessible
- Check browser console for errors
- Click "Try Again" button

### Login not working?
- Verify credentials (admin/admin123 or user/user123)
- Check browser console for errors
- Ensure localStorage is available

### Styles not applying?
- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check CSS file paths in components

---

## 📚 API Integration

### FakeStore API

Products endpoint: `https://fakestoreapi.com/products`

Response structure:
```json
[
  {
    "id": 1,
    "title": "Product Name",
    "price": 29.99,
    "description": "Product description...",
    "image": "https://url-to-image.jpg",
    "category": "electronics"
  }
]
```

---

## 🎓 Learning Resources

- React Documentation: https://react.dev
- React Router: https://reactrouter.com
- CSS Grid: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
- localStorage API: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

## 📄 License

This project is part of Project Kiosk and is available for educational and development purposes.

---

## 💡 Future Enhancements

- [ ] Backend API integration
- [ ] Real authentication (JWT/OAuth)
- [ ] Product search & filtering
- [ ] Product reviews & ratings
- [ ] User profile management
- [ ] Order history
- [ ] Wishlist functionality
- [ ] Analytics dashboard
- [ ] Multiple language support
- [ ] Dark mode theme
- [ ] Payment gateway integration
- [ ] Real-time inventory sync

---

## 👨‍💻 Development Notes

### Code Quality
- Clean, readable, production-level code
- Meaningful variable & function names
- Comments explaining complex logic
- Consistent code formatting
- No console errors or warnings

### Best Practices
- Component-based architecture
- Separation of concerns
- DRY (Don't Repeat Yourself)
- Proper error handling
- Accessibility standards
- Mobile-first responsive design

---

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Review the component comments
3. Check localStorage for state
4. Verify API connectivity
5. Clear cache and reload

---

**Built with ❤️ by a Senior MERN Developer**

Last Updated: April 2026
