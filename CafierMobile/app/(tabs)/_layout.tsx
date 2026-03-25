import { Tabs } from "expo-router";
import React from "react";
// Tambahkan impor View dan Text untuk membuat lencana angka
import { Text, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { Ionicons } from "@expo/vector-icons";
import { styles } from '../(style)/homepages.styles';
import { CartProvider, useCart } from '../../context/cart-context';

// Komponen khusus untuk Ikon Keranjang dengan Lencana (Badge)
function CartIconWithBadge({ color }: { color: string }) {
  const { cartItems } = useCart();
  
  // Menjumlahkan total barang yang ada di keranjang
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
      <Ionicons name="cart" size={30} color={color} />
      {/* Lencana angka hanya muncul jika ada barang di keranjang */}
      {totalItems > 0 && (
        <View style={{
          position: 'absolute',
          right: -8,
          top: -5,
          backgroundColor: '#C87A3F', // Warna lencana disesuaikan dengan tema aplikasi
          borderRadius: 10,
          minWidth: 18,
          height: 18,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 4,
        }}>
          <Text style={{ color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>
            {totalItems}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <CartProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#33241C',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: styles.bottomNav
        }}
      >
        <Tabs.Screen
          name="homepages"
          options={{
            title: 'homepages',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: 'menu',
            tabBarIcon: ({ color }) => (
              <Ionicons name="search" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="checkout"
          options={{
            title: 'checkout',
            // Ganti ikon biasa dengan komponen CartIconWithBadge
            tabBarIcon: ({ color }) => <CartIconWithBadge color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle-outline" size={30} color={color} />
            ),
          }}
        />
        
        <Tabs.Screen name="rincian" options={{ href: null }} />
        <Tabs.Screen name="change-profile" options={{ href: null }} />
        <Tabs.Screen name="order-status" options={{ href: null }} />
        <Tabs.Screen name="order-history" options={{ href: null }} />
        <Tabs.Screen name="benefits" options={{ href: null }} />
      </Tabs>
    </CartProvider>
  );
}