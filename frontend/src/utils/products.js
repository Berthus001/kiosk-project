/**
 * Mock Products Data
 * Will be replaced with backend API call (GET /api/products)
 */

export const PRODUCTS = [
  {
    id: 1,
    title: 'Chicken Burger',
    price: 8.99,
    category: 'meal',
    image: 'https://via.placeholder.com/250?text=Chicken+Burger',
    description: 'Grilled chicken breast with fresh lettuce'
  },
  {
    id: 2,
    title: 'Beef Burger',
    price: 9.99,
    category: 'meal',
    image: 'https://via.placeholder.com/250?text=Beef+Burger',
    description: 'Premium beef patty with cheddar cheese'
  },
  {
    id: 3,
    title: 'Veggie Pizza',
    price: 10.99,
    category: 'meal',
    image: 'https://via.placeholder.com/250?text=Veggie+Pizza',
    description: 'Fresh vegetables on thin crust'
  },
  {
    id: 4,
    title: 'Chocolate Cake',
    price: 4.99,
    category: 'dessert',
    image: 'https://via.placeholder.com/250?text=Chocolate+Cake',
    description: 'Rich chocolate layer cake'
  },
  {
    id: 5,
    title: 'Strawberry Cheesecake',
    price: 5.99,
    category: 'dessert',
    image: 'https://via.placeholder.com/250?text=Cheesecake',
    description: 'Creamy cheesecake with fresh strawberries'
  },
  {
    id: 6,
    title: 'Ice Cream Cup',
    price: 3.99,
    category: 'dessert',
    image: 'https://via.placeholder.com/250?text=Ice+Cream',
    description: 'Assorted ice cream flavors'
  },
  {
    id: 7,
    title: 'Coca Cola',
    price: 2.99,
    category: 'drinks',
    image: 'https://via.placeholder.com/250?text=Cola',
    description: 'Classic cola soft drink'
  },
  {
    id: 8,
    title: 'Iced Tea',
    price: 2.49,
    category: 'drinks',
    image: 'https://via.placeholder.com/250?text=Iced+Tea',
    description: 'Refreshing iced tea'
  },
  {
    id: 9,
    title: 'Fresh Juice',
    price: 3.49,
    category: 'drinks',
    image: 'https://via.placeholder.com/250?text=Fresh+Juice',
    description: 'Freshly squeezed orange juice'
  }
];

export const CATEGORIES = [
  { id: 'meal', label: 'Meals' },
  { id: 'dessert', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' }
];
