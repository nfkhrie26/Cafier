// app/_layout.tsx
import { Stack } from 'expo-router';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Library ikon favorit anak mobile


export default function RootLayout() {
  return (
    // <Stack screenOptions={{ headerShown: false }}>
    //   <Stack.Screen name="index" />
    //   <Stack.Screen name="login" />
    //   <Stack.Screen name="dashboard" />
    //   <Stack.Screen name="forget-password" />
    // </Stack>
    <Stack>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
    </Stack>
  );
}