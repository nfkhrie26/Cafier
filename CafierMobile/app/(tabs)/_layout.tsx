import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { styles } from '../(style)/homepages.styles';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: styles.bottomNav
      }}
    >
      <Tabs.Screen
        name="homepages"
        options={{
          title: 'homepages',
          // Lu ubah ikonnya di sini!
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home" size={30} color="#33241C" />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'menu',
          // Lu ubah ikonnya di sini!
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="search" size={30} color="#FFF" />
          ),
        }}
      />
      <Tabs.Screen
        name="checkout"
        options={{
          title: 'checkout',
          // Lu ubah ikonnya di sini!
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="cart" size={30} color="#FFF" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          // Lu ubah ikonnya di sini!
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="person-circle-outline" size={30} color="#33241C" />
          ),
        }}
      />
    </Tabs>
  );
}
