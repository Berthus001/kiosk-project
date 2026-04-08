import React, { createContext, useState } from 'react';

// Create cart context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

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

  // Prepare cart for checkout and send to backend
  const submitCheckout = async (backendUrl = '/api/orders') => {
    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    const orderData = {
      items: cartItems.map(({ id, title, price, quantity }) => ({
        productId: id,
        productName: title,
        price,
        quantity
      })),
      total: calculateTotal(),
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const result = await response.json();
      
      // Only clear cart after successful backend submission
      clearCart();
      return result;
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
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
    submitCheckout
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
