import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Library ikon favorit anak mobile
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* 🚨 BUNGKUSAN LUAR WAJIB STACK, BUKAN TABS! */}
      <Stack screenOptions={{ headerShown: false }}>
        
        {/* Kasih tau Expo buat masuk ke folder (tabs) */}
        <Stack.Screen name="(tabs)" />
        
        {/* Halaman error bawaan kalo user nyasar */}
        <Stack.Screen name="+not-found" />
        
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
