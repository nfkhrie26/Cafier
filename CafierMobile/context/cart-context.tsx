import React, { createContext, useContext, useState } from 'react';

// struktur data untuk item di keranjang
export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: any;
  temp?: string;
  size?: string;
  sugar?: string;
  desc?: string;
  isDessert?: boolean;
  notes?: string; // Tambahan properti notes di sini
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQty: (id: string, type: 'plus' | 'minus') => void;
  removeFromCart: (id: string) => void;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.id === newItem.id && 
          item.temp === newItem.temp && 
          item.size === newItem.size && 
          item.sugar === newItem.sugar &&
          item.notes === newItem.notes // Tambahan pengecekan notes biar ga kecampur
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].qty += newItem.qty;
        return updatedItems;
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const updateQty = (id: string, type: 'plus' | 'minus') => {
    setCartItems((prevItems) => 
      prevItems
        .map((item) => {
          if (item.id === id) {
            // Calculate new quantity without Math.max restriction
            const newQty = type === 'plus' ? item.qty + 1 : item.qty - 1;
            return { ...item, qty: newQty };
          }
          return item;
        })
        // Immediately remove items that reach 0 or less
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeFromCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart harus digunakan di dalam CartProvider');
  }
  return context;
}