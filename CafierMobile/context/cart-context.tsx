import React, { createContext, useContext, useState, useEffect } from 'react';
import { Voucher } from './voucher-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  cartItemId: string; 
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  variantDetails: { title: string; name: string }[];
  notes: string;
}
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('@cafier_cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('❌ Gagal narik memori keranjang:', error);
      } finally {
        setIsLoaded(true); // Tandain kalo udah selesai mikir
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      if (isLoaded) { // Pastiin jangan nyimpen array kosong sebelum data lama keload
        try {
          await AsyncStorage.setItem('@cafier_cart', JSON.stringify(cartItems));
        } catch (error) {
          console.error('❌ Gagal nyimpen keranjang:', error);
        }
      }
    };

    saveCart();
  }, [cartItems, isLoaded]);

  // 🚨 SATPAM VOUCHER (PENYAPU OTOMATIS) 🚨
  // Jalan setiap kali keranjang di-load ATAU voucher diganti/dihapus
  useEffect(() => {
    if (isLoaded) {
      // Kalau GA ADA voucher yg dipilih, ATAU vouchernya BUKAN voucher minuman gratis (id: 1)
      if (!selectedVoucher || selectedVoucher.id !== 1) {
        // Maka sapu bersih minuman 'free-americano-001' dari keranjang!
        setCartItems((prevItems) => 
          prevItems.filter((item) => item.id !== 'free-americano-001')
        );
      }
    }
  }, [selectedVoucher, isLoaded]);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.cartItemId === newItem.cartItemId);
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
    if (selectedVoucher.id === 2) {
      // Weekly Rewards: Diskon 15% dari subtotal
      discountAmount = subtotal * 0.15;
    } 
    else if (selectedVoucher.id === 1) {
      // 🚨 FIX DOUBLE DISCOUNT:
      // Karena item Ice Americano udah kita tembak dengan harga Rp 0,
      // discountAmount harusnya 0 aja biar ga dobel kepotong di subtotal.
      discountAmount = 0; 
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