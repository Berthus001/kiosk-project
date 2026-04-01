# 🗺️ Architecture & Flow Diagrams

## Application Structure Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    App.jsx (Root)                       │
│  - Router Setup                                         │
│  - Context Providers (Auth + Cart)                      │
│  - Route Configuration                                  │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
    ┌───▼────┐    ┌────▼────┐   ┌───▼────┐
    │ /login │    │/dashboard│   │  /*    │
    │        │    │(redirect)│   │ Catch  │
    └────┬───┘    └────┬─────┘   └────────┘
         │             │
         │        ┌────▼────────┐
         │        │ Check Role  │
         │        │ (Auth)      │
         │        └────┬────┬───┘
         │             │    │
         │         ┌───▼┐┌─▼────┐
         │        /admin│ /kiosk│
         │        │      │      │
         │        └──────┴──────┘
         │
    ┌────▼──────────────────┐
    │   Login Page           │
    ├───────────────────────┤
    │ • Form inputs         │
    │ • Auth validation     │
    │ • Error display       │
    │ • Demo credentials    │
    └──────────────────────┘
```

---

## Component Hierarchy

```
App
├── Router (BrowserRouter)
├── AuthProvider (Context)
└── CartProvider (Context)
    │
    ├── Routes
    │   ├── /login
    │   │   └── Login
    │   │
    │   ├── /dashboard
    │   │   └── ProtectedRoute
    │   │       └── CheckRoleAndRoute
    │   │           ├── /admin
    │   │           │   └── AdminPage
    │   │           │       ├── Navbar
    │   │           │       └── AdminDashboard
    │   │           │           └── ProductTable
    │   │           │
    │   │           └── /kiosk
    │   │               └── KioskPage
    │   │                   ├── Navbar
    │   │                   ├── ProductGrid
    │   │                   │   └── ProductCard (×20)
    │   │                   └── CartSidebar
    │   │                       └── CartItem (×n)
    │   │
    │   └── /admin & /kiosk
    │       └── ProtectedRoute
```

---

## State Management Architecture

```
┌─────────────────────────────────┐
│    Global State (Contexts)      │
├─────────────────────────────────┤
│                                 │
├─ AuthContext                    │
│  ├── user: User | null          │
│  ├── loading: boolean           │
│  ├── login(u,p): boolean        │
│  └── logout(): void             │
│                                 │
├─ CartContext                    │
│  ├── cartItems: Item[]          │
│  ├── addToCart(product)         │
│  ├── removeFromCart(id)         │
│  ├── updateQuantity(id, qty)    │
│  ├── calculateTotal()           │
│  ├── getTotalItemCount()        │
│  ├── clearCart()                │
│  └── checkout()                 │
│                                 │
└─────────────────────────────────┘
           ▲
           │ useContext()
           │
┌──────────┴──────────────────────────┐
│  Component Local State (useState)   │
├─────────────────────────────────────┤
│                                     │
├─ Login: username, password, error  │
├─ KioskPage: isCartOpen             │
├─ AdminDashboard: products, forms   │
├─ CartSidebar: (derived from context)
└─────────────────────────────────────┘
```

---

## Data Flow: Add to Cart

```
┌──────────────────────────────────────┐
│   User Clicks "Add to Cart"          │
│   (ProductCard component)            │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  ProductCard.handleAddToCart()       │
│  - Calls CartContext.addToCart()    │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  CartContext.addToCart(product)      │
│  - Check if exists in cartItems      │
│  - If YES: quantity++                │
│  - If NO: add with qty=1             │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  setCartItems(updated)               │
│  (State update triggers re-render)   │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  useEffect watches cartItems         │
│  - Executes on state change          │
│  - localStorage.setItem('cart', ...) │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  Components re-render with updates   │
│  - CartSidebar shows new item        │
│  - Navbar shows updated count        │
│  - All consumers of CartContext      │
└──────────────────────────────────────┘
```

---

## Data Flow: Authentication

```
┌──────────────────────────────┐
│  User Submits Login Form     │
│  (Login component)           │
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│  Login.handleSubmit()        │
│  - Calls AuthContext.login() │
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│  AuthContext.login(u, p)         │
│  - Search MOCK_USERS database    │
│  - Match username & password     │
└─────────────┬────────────────────┘
              │
       YES ◄──┴──► NO
        │          │
        ▼          ▼
    ┌─────┐   ┌────────┐
    │Save │   │Return  │
    │to   │   │false   │
    │LS  │   │        │
    └──┬──┘   └────┬───┘
       │           │
       ▼           ▼
    ┌──────┐  ┌─────────┐
    │ Set  │  │ Show    │
    │user  │  │ Error   │
    └──┬───┘  │ Message │
       │      └─────────┘
       ▼
  ┌─────────────┐
  │ Redirect to │
  │ /dashboard  │
  └─────────────┘
```

---

## Authentication & Routing Flow

```
┌──────────────────────┐
│    User Lands On     │
│    Application       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────┐
│ AuthContext useEffect    │
│ - Check localStorage     │
│ - Restore user if found  │
│ - Set loading = false    │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Check Current Route      │
└──────────┬───────────────┘
           │
        ┌──┴──┬────────┐
        │     │        │
    ┌───▼─┐  │    ┌───▼────┐
    │/login   │    │Other   │
    │(public) │    │routes  │
    └─────┘  │    │        │
        │    │    └───┬────┘
        │    │        │
        │    ▼        ▼
        │ ┌────────────────────┐
        │ │ ProtectedRoute     │
        │ │ check auth & role  │
        │ └────────┬───────┬───┘
        │          │       │
        │      OK  │   NOT │ NO
        │          │   AUTH│
        │          ▼       ▼
        │      ┌────┐ ┌──────┐
        │      │Page│ │Redirect
        │      │    │ │to /login
        └──────┴────┴─┴──────┘
```

---

## Component Communication Map

```
                    App.jsx
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   AuthProvider    CartProvider    Routes
        │              │              │
        │              │          ┌───┼────────┐
        │              │          │   │        │
     Login        Components    Pages  │
        │              │          │    │
        ├─ useContext────────────┼────┤
        │    (auth)              │    │
        │              │         │    │
        │        ┌──────┴─────┐  │    │
        │        │            │  │    │
        │    ProductCard   CartItem  │
        │        │            │  │    │
        │        └──────┬──────┘  │    │
        │               │ reads   │    │
        │        useContext(Cart) │    │
        │               │         │    │
        │         ┌─────┼─────┐   │    │
        │         │     │     │   │    │
        │      Navbar  Sidebar  Grid   │
        │         │     │     │   │    │
        └─────────┴─────┴─────┴───┴────┘
```

---

## Page Routing Decision Tree

```
                    URL Change
                        │
                        ▼
                 ┌────────────────┐
                 │ Router matches │
                 │ path pattern   │
                 └────────┬───────┘
                          │
            ┌─────────────┼─────────────┐
            │             │             │
        ┌───▼───┐     ┌───▼───┐   ┌───▼───┐
        │/login │     │/dash- │   │Others │
        │       │     │ board │   │       │
        └───┬───┘     └───┬───┘   └───┬───┘
            │             │           │
            ▼             ▼           ▼
        ┌─────────────────────┐  ┌────────┐
        │ ProtectedRoute      │  │Redirect│
        │ - Check auth        │  │to      │
        │ - Check role        │  │/dash   │
        │ - Check loading     │  │board   │
        └─────┬───────────────┘  └────────┘
              │
        ┌─────┼──────────────┐
        │     │              │
  NOT AUTH    ERROR      AUTHENTICATED
        │     │              │
        ▼     ▼              ▼
    ┌──────┐ ┌─────────┐  ┌──────────┐
    │/login│ │Loading  │  │Check Role│
    │      │ │Spinner  │  │          │
    └──────┘ └─────────┘  └──┬───┬───┘
                            │   │
                       ADMIN USER
                            │   │
                            ▼   ▼
                        ┌───┐┌──┐
                        │/ad││ki│
                        │min││os│
                        └───┘└──┘
```

---

## LocalStorage Persistence Strategy

```
┌────────────────────────────────────┐
│       Application Starts           │
└────────────┬───────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  AuthContext & CartContext mount    │
│  - useEffect runs immediately       │
└────────────┬───────────────────────┘
             │
        ┌────┴────┬─────────┐
        │          │         │
        ▼          ▼         ▼
   ┌────────┐ ┌───────┐ ┌─────────┐
   │Check   │ │Parse  │ │Restore  │
   │LS for  │ │JSON & │ │to React │
   │'user'  │ │'cart' │ │state    │
   └────┬───┘ └───┬───┘ └────┬────┘
        │         │          │
        └────┬────┴────┬─────┘
             │         │
             ▼         ▼
        ┌─────────────────┐
        │  State updated  │
        │  Components     │
        │  re-render      │
        └────────┬────────┘
                 │
         ┌───────┴────────┐
         │                │
    During App Use:   On State Change:
    • User edits    useEffect triggers
    • Cart updates  │
    • Data changes  ▼
                  localStorage.setItem()
                   │
                   ▼
            ┌───────────────┐
            │ Data persisted│
            │ (JSON string) │
            └─────┬─────────┘
                  │
            ┌─────▼──────────┐
            │ Survives page  │
            │ reload / close  │
            │ / reopen        │
            └────────────────┘
```

---

## Mobile Responsive Strategy

```
┌─────────────────────────────────┐
│   Device Width Detected         │
└────────────┬────────────────────┘
             │
        ┌────┴────┬──────┬─────────┐
        │          │      │         │
    ┌───▼───┐ ┌───▼──┐ ┌─▼─┐  ┌──▼──┐
    │Desktop│ │Tablet│ │Mob│  │Small│
    │1024+  │ │768+  │ │480│  │<480 │
    └───┬───┘ └───┬──┘ └─┬─┘  └──┬──┘
        │         │      │       │
        ▼         ▼      ▼       ▼
   ┌──────┐ ┌──────┐ ┌────┐ ┌─────┐
   │4 Col │ │3 Col │ │2Col│ │2 Col│
   │Grid  │ │Grid  │ │Grid│ │Grid │
   └──────┘ └──────┘ └────┘ └─────┘
        │         │      │       │
        └────┬────┴──┬───┴───┬───┘
             │       │       │
        CSS Media Queries:
             ▼       ▼       ▼
        @media @media @media
        (min-   (min-   (max-
         width: width: width:
         1024)  768)   480)
```

---

## Error Handling Flow

```
┌─────────────────────────────┐
│  Operation Fails            │
│  (API call, form, etc)      │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  Try-Catch Block            │
│  Catches error              │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  Set Error State            │
│  setError(message)          │
└────────────┬────────────────┘
             │
        ┌────┴────────────────────┐
        │                         │
    Type:Fetch           Type: Form
        │                    │
        ▼                    ▼
   ┌─────────┐         ┌────────┐
   │Show     │         │Display │
   │"Try     │         │Field   │
   │Again"   │         │Error   │
   │Button   │         │Message │
   └────┬────┘         └───┬────┘
        │                  │
        ▼                  ▼
   User Retries      User Fixes Form
        │                  │
        ▼                  ▼
   ┌─────────┐         ┌────────┐
   │Retry    │         │Submit  │
   │API Call │         │Again   │
   └─────────┘         └────────┘
```

---

## Feature Dependency Graph

```
        Authentication
            │
    ┌───────┼───────┐
    │       │       │
Navbar  Menu  Access
    │       │       │
    └───────┼───────┘
            │
    ┌───────┴────────┐
    │                │
  Admin          User Role
  Role           │
    │            └─────────────┐
    │                          │
AdminDash           ProductGrid
 │  │                 │
 │  └────────┬────────┘
 │           │
 │      AddToCart
 │           │
 │      ┌────┴────┐
 │      │          │
 └──────┼────┐     │
        │    │     │
    CartContext
        │
    ┌───┴────┐
    │         │
Persist   Display
(LS)     (Sidebar)
```

---

## Performance Optimization Areas

```
┌─────────────────────────────────┐
│  Performance Monitoring         │
└────────────┬────────────────────┘
             │
        ┌────┴─────┬────────┬────────┐
        │           │        │        │
    Render     State      Memory   Network
    │          │           │        │
    ▼          ▼           ▼        ▼
┌────────┐ ┌───────┐  ┌────────┐ ┌──────┐
│Component│ │Context│  │LS Size│ │API   │
│Memo     │ │only  │  │ Limit  │ │Calls │
│         │ │reuse  │  │        │ │(1)   │
└────────┘ └───────┘  └────────┘ └──────┘
    │          │           │        │
    └────┬─────┴─────┬─────┴────┬───┘
         │           │          │
    Avoid rerender  Lazy load  Cache
    when not        Components  Data
    needed
```

---

## Testing Journey Map

```
Start App
    │
    ▼
┌──────────┐
│ 1. Login │
│ Testing  │
└────┬─────┘
     │ admin/admin123
     ▼ user/user123
┌──────────┐
│ 2. Admin │
│Dashboard │
└────┬─────┘
     │ Add/Edit/Delete
     ▼ Products
┌──────────┐
│ 3. Kiosk │
│  Browse  │
└────┬─────┘
     │ See 20+ products
     ▼
┌──────────┐
│ 4. Cart  │
│  Ops     │
└────┬─────┘
     │ Add/Remove/Qty
     ▼
┌──────────┐
│ 5.LS     │
│ Persist  │
└────┬─────┘
     │ Refresh page
     ▼
┌──────────┐
│ Success! │
│ ✅ PASS  │
└──────────┘
```

---

This architecture ensures a scalable, maintainable, and performant kiosk application! 🚀
