import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const segments = useSegments(); // Buat tau user lagi nyoba buka halaman apa

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Cek isi dompet
        const token = await SecureStore.getItemAsync('userToken');
        const role = await SecureStore.getItemAsync('userRole');

        // 2. Cek user lagi di grup mana (auth, customer, atau barista)
        const inAuthGroup = segments[0] === '(auth)';

        if (!token) {
          // Kalo GAK ADA token, paksain ke halaman login!
          if (!inAuthGroup) {
            router.replace('../(auth)/login');
          }
        } else {
          // Kalo ADA token, tapi dia nyoba balik ke halaman login, cegah!
          if (inAuthGroup) {
            if (role === 'barista') {
              router.replace('../(barista)/(tabs)/dashboard');
            } else {
              router.replace('../(customer)/(tabs)/homepages');
            }
          }
        }
      } catch (error) {
        console.log("Error ngecek dompet:", error);
      } finally {
        setIsReady(true); // Proses ngecek selesai
      }
    };

    checkAuth();
  }, [segments]); // Bakal jalan tiap kali user pindah grup folder

  // Layar putih loading pas aplikasi baru diklik
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#C27A32" />
      </View>
    );
  }

  // Kalo udah aman, buka gerbangnya (pake Stack biar halamannya gak numpuk)
  return <Stack screenOptions={{ headerShown: false }} />;
}