import React, { createContext, useState, useEffect } from 'react';

// Create cart context
export const CartContext = createContext();

const CART_STORAGE_KEY = 'kiosk_cart_items';

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (err) {
      console.error('Failed to load cart from localStorage:', err);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [cartItems]);

  // Add item to cart or increase quantity if already exists
  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Increase quantity if product already in cart
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart completely
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    // Remove item if quantity is 0
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Increase quantity of an item
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity of an item
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  // Calculate total cart price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  // Get total number of items in cart
  const getTotalItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Export cart data (for viewing or future backend integration)
  const getCartData = () => {
    return {
      items: cartItems,
      total: calculateTotal(),
      itemCount: getTotalItemCount(),
      timestamp: new Date().toISOString()
    };
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    calculateTotal,
    getTotalItemCount,
    clearCart,
    getCartData
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
