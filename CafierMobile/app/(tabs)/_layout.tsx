import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Ionicons } from "@expo/vector-icons";
import { styles } from '../(style)/homepages.styles'; 

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // 1. KUNCI WARNANYA DI SINI BRE
        tabBarActiveTintColor: '#33241C',   // Warna Coklat Gelap kalo lagi dipencet (Aktif)
        tabBarInactiveTintColor: '#FFFFFF', // Warna Putih kalo lagi gak dipencet (Pasif)
        tabBarShowLabel: false,             // Ilangin teks di bawah ikon biar clean
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: styles.bottomNav
      }}
    >
      <Tabs.Screen
        name="homepages"
        options={{
          title: 'homepages',
          // 2. PAKE VARIABEL 'color' BIAR OTOMATIS GANTI
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
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" size={30} color={color} />
          ),
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
      
      {/* tambahan ini buat nyembunyiin halaman rincian dari navbar bawah */}
      <Tabs.Screen
        name="rincian"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen name="change-profile" options={{ href: null }} />
      <Tabs.Screen name="order-status" options={{ href: null }} />
      <Tabs.Screen name="order-history" options={{ href: null }} />
      <Tabs.Screen name="benefits" options={{ href: null }} />
    </Tabs>
  );
}