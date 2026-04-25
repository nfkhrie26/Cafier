import React, { createContext, useContext, useState } from 'react';
import { Voucher } from './voucher-context';

export type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
  image: any;
  temp?: string;
  size?: string;
  sugar?: string;
  desc?: string;
  isDessert?: boolean;
  notes?: string;
  flavor?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQty: (id: string, type: 'plus' | 'minus') => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  selectedVoucher: Voucher | null;
  applyVoucher: (voucher: Voucher) => void;
  removeVoucher: () => void;
  subtotal: number;
  discountAmount: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id);
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
      prevItems.map((item) => item.id === id ? { ...item, qty: type === 'plus' ? item.qty + 1 : item.qty - 1 } : item).filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedVoucher(null);
  };

  const applyVoucher = (voucher: Voucher) => setSelectedVoucher(voucher);
  const removeVoucher = () => setSelectedVoucher(null);

  // --- LOGIKA HITUNG HARGA DAN DISKON ---
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  let discountAmount = 0;
  
  if (selectedVoucher) {
    // FIX: Patokan pakai ID Voucher (Lebih aman!)
    if (selectedVoucher.id === 2) {
      // Weekly Rewards: Diskon 15% dari subtotal
      discountAmount = subtotal * 0.15;
    } 
    else if (selectedVoucher.id === 1) {
      // Monthly Rewards: Gratis Iced Americano (Misal dipotong Rp 32.000)
      discountAmount = 32000; 
      // Kalau subtotalnya di bawah 32rb, diskonnya maksimal seharga subtotal biar nggak minus
      if (discountAmount > subtotal) discountAmount = subtotal;
    }
  }

  const totalPrice = subtotal - discountAmount;

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, updateQty, removeFromCart, clearCart,
      selectedVoucher, applyVoucher, removeVoucher,
      subtotal, discountAmount, totalPrice, 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart harus digunakan di dalam CartProvider');
  return context;
}