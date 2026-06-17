import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Enforces pattern: Only save product ID and quantity in core local tracking state
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('marketmeld_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('marketmeld_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item._id === productId);
      if (existing) {
        return prevCart.map(item => item._id === productId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prevCart, { _id: productId, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item._id !== productId));
      return;
    }
    setCart(prev => prev.map(item => item._id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
