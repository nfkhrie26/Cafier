import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Slot, usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import { deleteItemAsync } from '@/service/storage'; // Helper bunglon lu
import * as SecureStore from "expo-secure-store";

export default function BaristaTabLayout() {
  const router = useRouter();
  const pathname = usePathname(); // CCTV buat mantau posisi page sekarang

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken"); // hp
    await SecureStore.deleteItemAsync("userRole");

    // await deleteItemAsync("userToken"); // pc
    // await deleteItemAsync("userRole");
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      
      {/* ================= BARIS 1: HEADER COKLAT TUA ================= */}
      <View style={styles.headerRow}>
        <View style={styles.logoSection}>
          <Ionicons name="leaf" size={24} color="#FFF" />
          <Text style={styles.logoText}>SERENE</Text>
        </View>

        <Text style={styles.welcomeText}>Welcome back Barista</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#FFF" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* ================= BARIS 2: NAVBAR KAPSUL TENGAH ================= */}
      <View style={styles.navbarWrapper}>
        <View style={styles.pillContainer}>
          
          {/* Tombol Home / Dashboard */}
          <TouchableOpacity 
            style={[styles.pillItem, pathname.includes('dashboard') && styles.pillItemActive]}
            onPress={() => router.replace('/dashboard')}
          >
            <Text style={[styles.pillText, pathname.includes('dashboard') && styles.pillTextActive]}>Home</Text>
          </TouchableOpacity>

          {/* Tombol Status Pemesanan */}
          <TouchableOpacity 
            style={[styles.pillItem, pathname.includes('OrdersTab') && styles.pillItemActive]}
            onPress={() => router.replace('/OrdersTab')}
          >
            <Text style={[styles.pillText, pathname.includes('status') && styles.pillTextActive]}>Status Pemesanan</Text>
          </TouchableOpacity>

          {/* Tombol Notifikasi Pembayaran */}
          <TouchableOpacity 
            style={[styles.pillItem, pathname.includes('PaymentTab') && styles.pillItemActive]}
            onPress={() => router.replace('./PaymentTab')}
          >
            <Text style={[styles.pillText, pathname.includes('notifikasi') && styles.pillTextActive]}>Notifikasi Pembayaran</Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* ================= BARIS 3: LUBANG KONTEN LUAR ================= */}
      {/* File dashboard.tsx, status.tsx, dll bakal nongol di dalam sini */}
      <View style={styles.contentArea}>
        <Slot />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBE3D5',
  },
  // Styling Baris Atas (Coklat)
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#3E2A1D',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  logoSection: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  logoText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
  welcomeText: { color: '#FFF', fontSize: 20, flex: 2, textAlign: 'center' },
  logoutButton: {
    flexDirection: 'row', backgroundColor: '#E53935', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, alignItems: 'center'
  },
  logoutText: { color: '#FFF', fontWeight: 'bold', marginLeft: 5, fontSize: 12 },

  // Styling Kapsul Tengah
  navbarWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#EBE3D5',
    zIndex: 10,
  },
  pillContainer: { flexDirection: 'row', backgroundColor: '#A88B7D', borderRadius: 30, padding: 4 },
  pillItem: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 25 },
  pillItemActive: { backgroundColor: '#3E2A1D' },
  pillText: { color: '#FFF', fontSize: 14 },
  pillTextActive: { fontWeight: 'bold' },

  // Area Halaman Utama
  contentArea: {
    flex: 1,
  }
});