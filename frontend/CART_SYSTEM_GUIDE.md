# 🛒 Cart System Implementation Guide

## Overview

The cart system is a complete client-side implementation using React Context API and localStorage. No backend interaction required!

---

## Architecture

### Cart Context Flow

```
CartProvider (App.jsx)
    ↓
├→ CartContext created
├→ Initial state loaded from localStorage
└→ All components can access cart state
    ↓
Component (ProductCard, CartItem, etc.)
    ↓
useContext(CartContext)
    ↓
Call cart methods (addToCart, removeFromCart, etc.)
    ↓
State updates
    ↓
Automatically saved to localStorage
    ↓
UI re-renders with new data
```

---

## State Management

### CartContext State
```javascript
const [cartItems, setCartItems] = useState([])
```

### Cart Item Structure
```javascript
{
  id: 1,
  title: "Product Name",
  price: 29.99,
  image: "https://...",
  description: "...",
  category: "...",
  quantity: 2  // Added by cart system
}
```

### Persistence Flow

```
User adds item
    ↓
addToCart() called
    ↓
cartItems state updated
    ↓
useEffect triggers
    ↓
localStorage.setItem('cart', JSON.stringify(cartItems))
    ↓
Cart persists across sessions
```

---

## Available Methods

### 1. Add to Cart
```javascript
addToCart(product)
```
- Adds a new item OR increases quantity if already exists
- Automatically merges duplicate items

**Example:**
```javascript
const { addToCart } = useContext(CartContext);

// In ProductCard
<button onClick={() => addToCart(product)}>
  Add to Cart
</button>
```

### 2. Remove from Cart
```javascript
removeFromCart(productId)
```
- Completely removes item from cart (all quantities)

**Example:**
```javascript
const { removeFromCart } = useContext(CartContext);

<button onClick={() => removeFromCart(123)}>
  Remove
</button>
```

### 3. Update Quantity
```javascript
updateQuantity(productId, quantity)
```
- Sets quantity to exact value
- Prevents negative quantities

**Example:**
```javascript
const { updateQuantity } = useContext(CartContext);

updateQuantity(123, 5); // Set to 5 units
```

### 4. Increase Quantity
```javascript
increaseQuantity(productId)
```
- Adds 1 to quantity

**Example:**
```javascript
const { increaseQuantity } = useContext(CartContext);

<button onClick={() => increaseQuantity(123)}>+</button>
```

### 5. Decrease Quantity
```javascript
decreaseQuantity(productId)
```
- Removes 1 from quantity (minimum 1)

**Example:**
```javascript
const { decreaseQuantity } = useContext(CartContext);

<button onClick={() => decreaseQuantity(123)}>−</button>
```

### 6. Calculate Total
```javascript
calculateTotal() → returns number
```
- Returns sum of all (price × quantity)

**Example:**
```javascript
const { calculateTotal } = useContext(CartContext);

const total = calculateTotal();
console.log(`Total: $${total.toFixed(2)}`);
```

### 7. Get Item Count
```javascript
getTotalItemCount() → returns number
```
- Returns total quantity of all items

**Example:**
```javascript
const { getTotalItemCount } = useContext(CartContext);

const count = getTotalItemCount();
console.log(`Items in cart: ${count}`);
```

### 8. Clear Cart
```javascript
clearCart()
```
- Empties entire cart

**Example:**
```javascript
const { clearCart } = useContext(CartContext);

<button onClick={() => clearCart()}>
  Clear Cart
</button>
```

### 9. Checkout
```javascript
checkout() → returns boolean
```
- Simulates purchase
- Logs to console
- Shows alert with summary
- Clears cart

**Example:**
```javascript
const { checkout } = useContext(CartContext);

const success = checkout();
if (success) {
  console.log('Purchase complete!');
}
```

---

## Usage Examples

### Example 1: Adding Item to Cart

**ProductCard.jsx**
```javascript
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.title} added to cart!`);
  };

  return (
    <div>
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>
        🛒 Add to Cart
      </button>
    </div>
  );
};
```

### Example 2: Displaying Cart Items

**CartItem.jsx**
```javascript
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useContext(CartContext);

  const itemTotal = item.price * item.quantity;

  return (
    <div>
      <h4>{item.title}</h4>
      <p>${item.price}</p>
      
      <button onClick={() => decreaseQuantity(item.id)}>−</button>
      <span>{item.quantity}</span>
      <button onClick={() => increaseQuantity(item.id)}>+</button>
      
      <p>${itemTotal.toFixed(2)}</p>
      <button onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </div>
  );
};
```

### Example 3: Checkout Process

**CartSidebar.jsx**
```javascript
const CartSidebar = ({ isOpen, onClose }) => {
  const {
    cartItems,
    calculateTotal,
    checkout,
    clearCart
  } = useContext(CartContext);

  const total = calculateTotal();

  const handleCheckout = () => {
    checkout(); // Logs to console & shows alert
    onClose();   // Close cart sidebar
  };

  return (
    <div>
      <h2>Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <p>Empty</p>
      ) : (
        <>
          <div>Total: ${total.toFixed(2)}</div>
          <button onClick={handleCheckout}>
            Checkout
          </button>
          <button onClick={clearCart}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};
```

---

## Data Flow Diagram

### Adding Product to Cart

```
User clicks "Add to Cart"
          ↓
ProductCard calls addToCart(product)
          ↓
CartContext checks if product already exists
          ↓
        YES: Increase quantity by 1
        NO: Add with quantity 1
          ↓
cartItems state updated
          ↓
useEffect watches cartItems
          ↓
localStorage updated automatically
          ↓
Components re-render with new cart
          ↓
UI shows updated cart count
```

### Retrieving Cart on Page Load

```
App loads
          ↓
CartProvider useEffect runs
          ↓
Check localStorage for 'cart' key
          ↓
        FOUND: Parse JSON and set state
        NOT FOUND: Use empty array
          ↓
cartItems state initialized
          ↓
All components can now access cart data
          ↓
Cart persisted from previous session!
```

---

## Business Logic

### Preventing Duplicates
```javascript
// When adding product
if (cartItem already exists) {
  quantity++
} else {
  add new item with quantity 1
}
```

### Preventing Negative Quantities
```javascript
// Decrease quantity
if (quantity > 0) {
  quantity--
}

// Directly set quantity
if (quantity < 0) {
  return (do nothing)
}
```

### Automatic Total Calculation
```javascript
// For each item
total += item.price * item.quantity

// Return final total
return total
```

---

## LocalStorage Keys

```javascript
// Cart storage key
const CART_KEY = 'cart'

// Stored format
{
  'cart': '[
    {id: 1, title: "...", price: 29.99, quantity: 2, ...},
    {id: 2, title: "...", price: 49.99, quantity: 1, ...}
  ]'
}

// Access in DevTools
→ Application → LocalStorage → localhost:5173 → 'cart'
```

---

## Error Handling

### InvalidQuantity
```javascript
// Prevented by:
if (quantity < 0) return;
if (decreaseQuantity && item.quantity <= 1) return;
```

### DuplicateItems
```javascript
// Handled by:
if (item exists) {
  quantity++
} else {
  add new
}
```

### JSON Parsing Errors
```javascript
try {
  const cart = JSON.parse(localStorage.getItem('cart'));
  setCartItems(cart);
} catch (e) {
  console.error('Failed to restore cart');
  setCartItems([]); // Start fresh
}
```

---

## Performance Considerations

### Optimization
- ✅ useEffect watches cartItems to sync localStorage
- ✅ prevents unnecessary re-renders
- ✅ Efficient array operations
- ✅ No unnecessary API calls

### Scalability
- Can handle 100+ items
- Efficient calculation methods
- Minimal re-renders
- Fast localStorage operations

---

## Testing the Cart

### Manual Testing Steps

**Test 1: Add to Cart**
1. Login as user
2. Click "Add to Cart" on product
3. Check if item appears in cart sidebar
4. ✅ PASS if item added

**Test 2: Quantity Increase**
1. Add item to cart
2. Click "+" button
3. Check quantity increased
4. ✅ PASS if quantity is 2

**Test 3: Quantity Decrease**
1. Add item with quantity 2
2. Click "−" button
3. Check quantity decreased to 1
4. ✅ PASS if quantity is 1

**Test 4: Cart Persistence**
1. Add items to cart
2. Hard refresh page (Ctrl+Shift+R)
3. Check cart still shows items
4. ✅ PASS if cart restored

**Test 5: Checkout**
1. Add items to cart
2. Click "Checkout" button
3. Check browser console for log
4. Check cart is empty after
5. ✅ PASS if all true

**Test 6: Clear Cart**
1. Add items to cart
2. Click "Clear Cart"
3. Check cart is empty
4. ✅ PASS if empty

---

## Console Debugging

### View Cart in Console
```javascript
// In browser DevTools console
JSON.parse(localStorage.getItem('cart'))
```

### View Cart State
Install React DevTools extension:
- Open DevTools
- Go to Components tab
- Find CartProvider
- Expand to see cartItems

### Manual Cart Modification
```javascript
// In console
const cart = [
  {id:1, title:"Test", price:10, quantity:2}
];
localStorage.setItem('cart', JSON.stringify(cart));
location.reload(); // See changes in app
```

### Checkout Simulation
```javascript
// In console (when logged in as user)
// Check for entries when you click Checkout
// You'll see:
// 🛒 Checkout Summary:
// Items: [...]
// Total: $XXX.XX
```

---

## API Integration Notes

### Current: FakeStore API
- Fetches real products from: `https://fakestoreapi.com/products`
- Products have: id, title, price, description, image, category

### For Product Properties Used by Cart
```javascript
// Product object (from API)
{
  id: 1,           // Used as key
  title: "...",    // Display name
  price: 29.99,    // For calculation
  image: "...",    // For thumbnail
  // ... other fields not used by cart
}

// Cart item (product + quantity)
{
  ...product,      // All product fields
  quantity: 2      // Added by cart system
}
```

---

## Extending the Cart System

### To Add: Product Discounts
```javascript
const calculateTotal = () => {
  return cartItems.reduce((total, item) => {
    const price = item.discount 
      ? item.price * (1 - item.discount)
      : item.price;
    return total + (price * item.quantity);
  }, 0);
};
```

### To Add: Minimum Order
```javascript
const checkout = () => {
  if (calculateTotal() < 50) {
    alert('Minimum order: $50');
    return false;
  }
  // ... checkout logic
};
```

### To Add: Promo Codes
```javascript
const [promoCode, setPromoCode] = useState('');

const applyPromo = (code) => {
  const discounts = { 'SAVE10': 0.1 };
  return discounts[code] || 0;
};
```

---

## Summary

- ✅ Complete client-side cart
- ✅ No backend required
- ✅ Persistent storage
- ✅ Real-time calculations
- ✅ Fully functional
- ✅ Production-ready code

**The cart system is ready to use out of the box!**

---

Last Updated: April 2026
