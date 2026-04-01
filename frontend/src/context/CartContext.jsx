import React, { createContext, useState, useEffect } from 'react';

// Create cart context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Restore cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error('Failed to restore cart from localStorage', e);
      }
    }
    setLoading(false);
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, loading]);

  // Add item to cart or increase quantity if already exists
  const addToCart = (product) => {
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
    // Ensure quantity never goes below 0
    if (quantity < 0) return;

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
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate total cart price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
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

  // Checkout simulation
  const checkout = () => {
    if (cartItems.length === 0) {
      alert('Cart is empty!');
      return false;
    }

    const total = calculateTotal();
    console.log('🛒 Checkout Summary:');
    console.log('Items:', cartItems);
    console.log('Total: $' + total.toFixed(2));
    console.log('Checkout completed!');

    alert(
      `Checkout successful!\nTotal: $${total.toFixed(
        2
      )}\n\nItems purchased: ${cartItems.length}`
    );
    clearCart();
    return true;
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
    checkout
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
