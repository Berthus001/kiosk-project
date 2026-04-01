# 📚 Complete Component & API Reference

## Table of Contents
1. [Components](#components)
2. [Contexts](#contexts)
3. [Pages](#pages)
4. [Styling](#styling)
5. [Hooks](#hooks)
6. [Utilities](#utilities)

---

## COMPONENTS

### 1. Login Component
**Location:** `src/components/Login.jsx`
**Purpose:** Authentication form with mock login
**Props:** None
**Context Used:** AuthContext

#### Features
- Form validation
- Mock authentication against MOCK_USERS
- Error message display
- Loading state
- Demo credentials shown
- Redirect on success (useNavigate)

#### Code Example
```javascript
import Login from './components/Login';

<Route path="/login" element={<Login />} />
```

#### User Actions
- Enter username & password
- Click Login
- See error or redirect to dashboard

---

### 2. Navbar Component
**Location:** `src/components/Navbar.jsx`
**Purpose:** Navigation header with user info and logout
**Props:** None
**Context Used:** AuthContext, CartContext

#### Features
- Displays current user name
- Shows user role badge (admin/user)
- Shows cart item count (only for users)
- Logout button
- Sticky positioning

#### Code Example
```javascript
import Navbar from './components/Navbar';

<Navbar />
```

#### Displays
- User name and role
- Cart count (red badge with number)
- Logout button

---

### 3. ProductCard Component
**Location:** `src/components/ProductCard.jsx`
**Purpose:** Individual product display card
**Props:**
```javascript
{
  product: {
    id: number,
    title: string,
    price: number,
    image: string,
    description: string,
    // ... other fields
  }
}
```
**Context Used:** CartContext

#### Features
- Product image display
- Title, description, price
- "Add to Cart" button
- Hover effects
- Touch-optimized

#### Code Example
```javascript
import ProductCard from './components/ProductCard';

<ProductCard product={productData} />
```

#### Renders
- Image container with product image
- Product title (2-line truncate)
- Product description (2-line truncate)
- Price in red
- Large "Add to Cart" button

---

### 4. ProductGrid Component
**Location:** `src/components/ProductGrid.jsx`
**Purpose:** Display all products in responsive grid
**Props:** None
**Context Used:** None

#### Features
- Fetches from FakeStore API
- Displays loading spinner
- Error handling with retry
- Responsive grid layout
- 4 columns (desktop), 3 (tablet), 2 (mobile)

#### Code Example
```javascript
import ProductGrid from './components/ProductGrid';

<ProductGrid />
```

#### Lifecycle
1. Mount: useEffect triggers fetch
2. Loading: Show spinner
3. Success: Render grid
4. Error: Show error with retry button

#### API Call
```javascript
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => setProducts(data))
```

---

### 5. CartItem Component
**Location:** `src/components/CartItem.jsx`
**Purpose:** Display single item in cart with controls
**Props:**
```javascript
{
  item: {
    id: number,
    image: string,
    title: string,
    price: number,
    quantity: number
  }
}
```
**Context Used:** CartContext

#### Features
- Product image thumbnail
- Product details
- Quantity controls (±)
- Item total calculation
- Remove button

#### Code Example
```javascript
import CartItem from './components/CartItem';

{cartItems.map(item => (
  <CartItem key={item.id} item={item} />
))}
```

#### Controls
- "−" button: Decrease (disabled when qty=1)
- Quantity display
- "+" button: Increase
- "✕" button: Remove completely

---

### 6. CartSidebar Component
**Location:** `src/components/CartSidebar.jsx`
**Purpose:** Modal sidebar displaying shopping cart
**Props:**
```javascript
{
  isOpen: boolean,      // Show/hide sidebar
  onClose: function     // Callback to close
}
```
**Context Used:** CartContext

#### Features
- Modal overlay
- Smooth slide animation
- Cart item list
- Cart summary (items, total)
- Checkout button
- Clear cart button
- Empty state message

#### Code Example
```javascript
import CartSidebar from './components/CartSidebar';

const [isCartOpen, setIsCartOpen] = useState(false);

<CartSidebar 
  isOpen={isCartOpen} 
  onClose={() => setIsCartOpen(false)}
/>
```

#### Display States
- **Empty:** "Your cart is empty" message
- **With Items:** List of cart items, totals, buttons

---

### 7. AdminDashboard Component
**Location:** `src/components/AdminDashboard.jsx`
**Purpose:** Admin product management interface
**Props:** None
**Context Used:** None (local state only)

#### Features
- Product listing table
- Add new product button
- Edit product modal
- Delete confirmation
- Form validation
- Local state management

#### Code Example
```javascript
import AdminDashboard from './components/AdminDashboard';

<AdminDashboard />
```

#### Actions Available
- **Add:** Click "➕ Add New Product" → Fill form → Submit
- **Edit:** Click "✎ Edit" → Modify form → Update
- **Delete:** Click "🗑 Delete" → Confirm → Remove

---

### 8. ProtectedRoute Component
**Location:** `src/components/ProtectedRoute.jsx`
**Purpose:** Route protection based on auth and role
**Props:**
```javascript
{
  element: ReactNode,           // Component to render
  requiredRole: string (optional) // 'admin' or 'user'
}
```
**Context Used:** AuthContext

#### Features
- Authentication check
- Role verification
- Loading state
- Redirect to login if not authenticated
- Show access denied if role mismatch

#### Code Example
```javascript
import ProtectedRoute from './components/ProtectedRoute';

<Route 
  path="/admin" 
  element={
    <ProtectedRoute 
      element={<AdminPage />}
      requiredRole="admin"
    />
  }
/>
```

#### Behaviors
- Not authenticated → Redirect to `/login`
- Wrong role → Show access denied
- Correct role → Render component

---

## CONTEXTS

### 1. AuthContext
**Location:** `src/context/AuthContext.jsx`
**Purpose:** Global authentication state management

#### Export
```javascript
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => { ... }
```

#### State
```javascript
{
  user: {
    id: number,
    username: string,
    role: 'admin' | 'user',
    name: string
  } | null,
  loading: boolean,
  isAuthenticated: boolean
}
```

#### Methods
```javascript
login(username, password) → boolean
logout() → void
```

#### Usage
```javascript
const { user, login, logout, isAuthenticated, loading } = useContext(AuthContext);

// Check auth status
if (loading) return <div>Loading...</div>;
if (!isAuthenticated) return <Navigate to="/login" />;

// Logout
<button onClick={() => logout()}>Logout</button>

// Check role
if (user?.role === 'admin') { ... }
```

#### Mock Users Database
```javascript
MOCK_USERS = {
  admin: {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  user: {
    username: 'user',
    password: 'user123',
    role: 'user',
    name: 'Regular User'
  }
}
```

#### LocalStorage
- Key: `'user'`
- Value: JSON stringified user object
- Auto-restored on app load

---

### 2. CartContext
**Location:** `src/context/CartContext.jsx`
**Purpose:** Global shopping cart state management

#### Export
```javascript
export const CartContext = createContext();
export const CartProvider = ({ children }) => { ... }
```

#### State
```javascript
cartItems: Array<{
  id: number,
  title: string,
  price: number,
  image: string,
  quantity: number,
  ...otherFields
}>
```

#### Methods
```javascript
addToCart(product) → void
removeFromCart(productId) → void
updateQuantity(productId, quantity) → void
increaseQuantity(productId) → void
decreaseQuantity(productId) → void
calculateTotal() → number
getTotalItemCount() → number
clearCart() → void
checkout() → boolean
```

#### Usage
```javascript
const {
  cartItems,
  addToCart,
  removeFromCart,
  calculateTotal,
  getTotalItemCount,
  checkout
} = useContext(CartContext);

// Add item
<button onClick={() => addToCart(product)}>Add</button>

// Show total
<span>${calculateTotal().toFixed(2)}</span>

// Show count
<span>Items: {getTotalItemCount()}</span>
```

#### LocalStorage
- Key: `'cart'`
- Value: JSON stringified cartItems array
- Auto-synced on state change
- Auto-restored on app load

---

## PAGES

### 1. Home Page
**Location:** `src/pages/Home.jsx`
**Purpose:** Original home page (can be extended)

#### Features
- API health check
- Status display
- Simple layout

#### Usage
```javascript
<Route path="/home" element={<Home />} />
```

---

### 2. KioskPage
**Location:** `src/pages/KioskPage.jsx`
**Purpose:** Main user shopping interface
**Protected:** Yes (requires 'user' role)

#### Contains
- Navbar (header)
- ProductGrid (main content)
- CartSidebar (overlay)
- Floating cart button

#### Interactions
- Click floating cart button to open/close footer
- Click "Add to Cart" on products
- Adjust quantities in cart
- Proceed to checkout

#### Code Example
```javascript
<Route
  path="/kiosk"
  element={
    <ProtectedRoute 
      element={<KioskPage />}
      requiredRole="user"
    />
  }
/>
```

---

### 3. AdminPage
**Location:** `src/pages/AdminPage.jsx`
**Purpose:** Admin product management interface
**Protected:** Yes (requires 'admin' role)

#### Contains
- Navbar (header)
- AdminDashboard (main content)

#### Interactions
- Add products
- Edit products
- Delete products
- View all products

#### Code Example
```javascript
<Route
  path="/admin"
  element={
    <ProtectedRoute 
      element={<AdminPage />}
      requiredRole="admin"
    />
  }
/>
```

---

## STYLING

### Global CSS
**File:** `src/styles/app.css` & `src/index.css`
- Reset styles
- Font definitions
- Scrollbar styling
- Base HTML structure

### Component-Specific CSS
Each component has its own CSS file:

| Component | CSS File |
|-----------|----------|
| Login | `login.css` |
| Navbar | `navbar.css` |
| ProductGrid | `productGrid.css` |
| ProductCard | `productCard.css` |
| CartSidebar | `cartSidebar.css` |
| CartItem | `cartItem.css` |
| AdminDashboard | `adminDashboard.css` |
| KioskPage | `kioskPage.css` |
| AdminPage | `adminPage.css` |

### Color Palette
```javascript
Primary: '#667eea'      // Purple-Blue
Secondary: '#764ba2'    // Dark Purple
Success: '#27ae60'      // Green
Danger: '#e74c3c'       // Red
Dark: '#2c3e50'         // Dark Gray
Light: '#f8f9fa'        // Light Gray
```

### Responsive Breakpoints
```javascript
Desktop:   1024px+
Tablet:    768px - 1023px
Mobile:    < 768px
Small:     < 480px
```

### Touch-Friendly Sizing
- Button minimum height: 44px (mobile), 50px (tablet/desktop)
- Button padding: 12-16px
- Tap targets: 48px minimum

---

## HOOKS

### Custom Hooks Used

#### useContext
```javascript
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { CartContext } from './context/CartContext';

// In any component:
const auth = useContext(AuthContext);
const cart = useContext(CartContext);
```

#### useState
```javascript
const [cartItems, setCartItems] = useState([]);
const [isOpen, setIsOpen] = useState(false);
```

#### useEffect
```javascript
// Fetch products on mount
useEffect(() => {
  fetchProducts();
}, []);

// Sync cart to localStorage
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}, [cartItems]);
```

#### useNavigate
```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/dashboard');
```

---

## UTILITIES

### Constants
**File:** `src/utils/constants.js` (optional)

```javascript
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  KIOSK: '/kiosk',
  ADMIN: '/admin'
};

export const API_ENDPOINTS = {
  PRODUCTS: 'https://fakestoreapi.com/products'
};

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};
```

### Logger
**File:** `src/utils/logger.js` (optional for backend)

```javascript
export const log = (message, data) => {
  console.log(`[${new Date().toISOString()}] ${message}`, data);
};

export const error = (message, err) => {
  console.error(`[ERROR] ${message}`, err);
};
```

---

## ROUTING MAP

```
                    ┌─────────────────┐
                    │   App.jsx       │
                    │   Router Setup  │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
        ┌───▼──────┐    ┌────▼──────┐   ┌───▼──────┐
        │  /login  │    │ /dashboard│   │   /*     │
        │  Login   │    │(RoleCheck)│   │  Ignore  │
        └─────────┬┘    └────┬──────┘   └──────────┘
                 │           │
          ┌──────┴─────┐     │
          │            │     │
     ┌────▼───┐   ┌────▼──┐  │
     │Success │   │ Admin │  │
     │Redirect│   │ User  │  │
     └────────┘   └────┬──┘  │
                       │     │
            ┌──────────┴──────┴──────┐
            │                       │
        ┌───▼──────┐        ┌──────▼───┐
        │  /admin  │        │  /kiosk  │
        │Protected │        │Protected │
        │ (admin)  │        │(user)    │
        └──────────┘        └──────────┘
```

---

## FILE EXPORTS

### AuthContext
```javascript
export const AuthContext
export const AuthProvider
```

### CartContext
```javascript
export const CartContext
export const CartProvider
```

### Components
```javascript
export default Login
export default Navbar
export default ProductCard
export default ProductGrid
export default CartItem
export default CartSidebar
export default AdminDashboard
export default ProtectedRoute
```

### Pages
```javascript
export default Home
export default KioskPage
export default AdminPage
```

---

## RECOMMENDED EXTENSIONS

For development:
- React DevTools (Browser extension)
- Redux DevTools (for state inspection)
- Vite plugin (VS Code)
- ESLint extension (Code quality)
- Prettier extension (Code formatting)

---

## NEXT STEPS

### To Extend Functionality
1. Add backend API integration to AuthContext
2. Connect shopping cart to real payment gateway
3. Add user profile management
4. Implement order history
5. Add product search & filtering
6. Create admin analytics dashboard

### To Improve Performance
1. Add code splitting with React.lazy()
2. Implement image optimization
3. Add service worker for offline support
4. Use React.memo() for expensive components
5. Debounce search and filter inputs

### To Add Features
1. Product reviews & ratings
2. Wishlist functionality
3. Product recommendations
4. Email notifications
5. Real-time inventory
6. Multiple language support

---

**Last Updated: April 2026**

For more details, see:
- [Quick Start Guide](./QUICK_START.md)
- [Full Documentation](./KIOSK_FRONTEND_README.md)
- [Cart System Guide](./CART_SYSTEM_GUIDE.md)
