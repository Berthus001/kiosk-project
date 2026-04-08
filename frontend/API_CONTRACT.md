# Frontend-Backend API Contract

## Products Endpoint

### GET `/api/products`

**Description:** Fetch all products from the database.

**Response Format:**
```json
[
  {
    "id": 1,
    "title": "Chicken Burger",    // or "name" - ProductCard supports both
    "price": 8.99,
    "category": "meal",           // Must match: "meal", "dessert", or "drinks"
    "image": "https://example.com/chicken-burger.jpg",
    "description": "Optional: Grilled chicken breast with fresh lettuce"
  },
  {
    "id": 2,
    "title": "Beef Burger",
    "price": 9.99,
    "category": "meal",
    "image": "https://example.com/beef-burger.jpg",
    "description": "Premium beef patty with cheddar cheese"
  }
  // ... more products
]
```

**Response Status:**
- `200 OK` - Success with products array
- `500 Internal Server Error` - Database error

**Important Notes:**
- Always return an array (even if empty `[]`)
- Return at least the required fields: `id`, `title`/`name`, `price`, `category`, `image`
- `price` must be a number (not string)
- `category` values must exactly match: `"meal"`, `"dessert"`, or `"drinks"`
- If a product has no image URL, pass `null` or empty string (frontend will show "No Image")

---

## Orders Endpoint

### POST `/api/orders`

**Request Body:**
```json
{
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 8.99
    },
    {
      "productId": 2,
      "quantity": 1,
      "price": 9.99
    }
  ],
  "total": 27.97
}
```

**Response Format:**
```json
{
  "orderId": 123,
  "status": "success",
  "message": "Order placed successfully"
}
```

---

## Category Values

The frontend CategoryBar component uses these static category values:
- `"meal"` 
- `"dessert"`
- `"drinks"`

Products in the database must use these exact category values for filtering to work.

---

## Frontend Behavior

### Landing Page (`/`)
- **No products displayed**
- User sees title and "Start Ordering" button
- Click button → Navigate to `/menu`

### Menu Page (`/menu`)
- **Fetches products from GET /api/products**
- Shows loading spinner while fetching
- If fetch fails → Shows error message with "Try Again" button
- If fetch returns empty array `[]` → Shows "No products available"
- If fetch succeeds → Displays products in grid
- Users can filter by category (meal/dessert/drinks)
- Unauthenticated users can view products but:
  - Click "Add to Cart" → Auth modal appears
  - Modal offers Login/Signup options

### Kiosk Page (`/kiosk`)
- **Protected route - requires authentication**
- Displays cart and products
- Users can add items to cart and checkout
- Cart is session-only (frontend state, no database persistence)
- Checkout sends cart data to POST `/api/orders`

---

## API Configuration

**Base URL:** `http://localhost:5000/api` (configurable via `.env`)

**Environment Variables:**
```
REACT_APP_API_URL=http://localhost:5000/api
```

To override in development:
```
REACT_APP_API_URL=https://api.example.com npm start
```

---

## Error Handling

### Frontend Error States:
1. **API Connection Error** → "Failed to fetch products"
2. **Invalid Response Format** → "API did not return an array of products"
3. **HTTP Error (4xx, 5xx)** → "API error: [status text]"

### All Errors Show:
- Error message
- "Try Again" button to reload page

---

## Data Flow Diagram

```
LandingPage
    ↓
    [Start Ordering Button]
    ↓
MenuPage
    ↓
    [useEffect] → GET /api/products
    ↓
    [Show loading OR error OR products]
    ↓
    [If authenticated] Add to Cart → Kiosk Page
    [If not authenticated] Add to Cart → Auth Modal → Login/Signup
    ↓
Kiosk Page → Checkout → POST /api/orders
```
