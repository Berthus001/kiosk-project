# 🚀 Quick Start Guide - Kiosk Frontend

## Installation & Setup (3 steps)

### Step 1: Install Dependencies
```bash
# Navigate to frontend folder
cd frontend

# Install all required packages
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
The app will automatically open at `http://localhost:5173`

### Step 3: Log In
Use one of these test accounts:

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**User Account:**
- Username: `user`
- Password: `user123`

---

## 🧭 Navigation After Login

### If you login as ADMIN:
- ✅ Go to Admin Dashboard
- 📊 View, Add, Edit, Delete products
- 🎯 Manage product inventory

### If you login as USER:
- ✅ Go to Kiosk Shopping Page
- 🛒 Browse products from FakeStore API
- 🛍️ Add items to cart
- 💳 Proceed to checkout (simulated)

---

## 📱 Features at a Glance

### Authentication
- Login with role-based access
- Session persists after page reload
- Logout from navbar

### Shopping (User Role)
- Browse 20+ products
- Click "🛒 Add to Cart" on any product
- Open cart with floating button (📱 emoji)
- Adjust quantities with +/- buttons
- See total price in real-time
- Click "✓ Checkout" to complete purchase

### Admin Panel (Admin Role)
- Click "➕ Add New Product" to add items
- Click "✎ Edit" to modify products
- Click "🗑 Delete" to remove products
- View all products in table format

---

## 🎨 Interface Overview

### Navbar (visible on all authenticated pages)
```
[🏪 Kiosk System] [👤 User Name] [🛒 5] [Logout]
```

### Product Grid (User Page)
- Large product cards with images
- Product name, description, price
- Big "Add to Cart" button (touch-friendly)

### Cart Sidebar (slides from right)
- Shows all items in cart
- Adjust quantities
- See item totals and grand total
- Checkout or Clear Cart buttons

### Admin Dashboard
- Table of all products
- Buttons to Edit or Delete each product
- "Add New Product" button at top
- Modal form for adding/editing

---

## 💾 Data Storage

All data is stored locally in your browser:
- **User session** → Saved after login
- **Shopping cart** → Persists across page reloads
- **Products** → Fetched from FakeStore API

No backend required! Everything works offline once loaded.

---

## 🛠️ Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

---

## 🐛 Troubleshooting

**Q: Products not loading?**
- A: Check your internet (needs to fetch from FakeStore API)
- Click "Try Again" button to retry

**Q: Cart not showing items after reload?**
- A: Check browser's localStorage is enabled
- Open DevTools → Application → LocalStorage

**Q: Login button not working?**
- A: Verify credentials match exactly (case-sensitive)
- Clear browser cache (Ctrl+Shift+Del)

**Q: Styles look broken?**
- A: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache

---

## 📚 Components Built

✅ **8 React Components** - All fully functional
✅ **2 Context Providers** - Auth & Cart state
✅ **3 Pages** - Home, Kiosk, Admin
✅ **11 CSS Files** - Responsive styling
✅ **Role-Based Routing** - Protected pages
✅ **Fetch Integration** - Real API calls
✅ **LocalStorage Sync** - Persistent state

---

## 🎯 What You Can Do

### As a Regular User 👤
1. ✅ Login
2. ✅ Browse products
3. ✅ Add to cart
4. ✅ Adjust quantities
5. ✅ Checkout (simulated)
6. ✅ View cart persists on reload

### As an Admin 👨‍💼
1. ✅ Login
2. ✅ View product list
3. ✅ Add new product
4. ✅ Edit existing product
5. ✅ Delete product
6. ✅ See all changes instantly

---

## 📖 Full Documentation

For detailed information, see `KIOSK_FRONTEND_README.md`

---

## ✨ Highlights

- 🎯 **Touch-optimized UI** - Large buttons for kiosk
- 📱 **Fully responsive** - Works on all devices
- ⚡ **Lightning fast** - Modern React architecture
- 🔒 **Secure** - Client-side state management
- 💾 **Persistent** - Cart survives reload
- 🎨 **Beautiful** - Modern gradient designs
- ♿ **Accessible** - Proper form inputs & labels

---

**Ready to start? Run `npm run dev` and login! 🚀**
