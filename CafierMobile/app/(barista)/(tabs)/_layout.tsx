import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Slot, usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from "expo-secure-store";

export default function BaristaTabLayout() {
  const router = useRouter();
  const pathname = usePathname(); 

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken"); 
    await SecureStore.deleteItemAsync("userRole");
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      
      {/* ================= BARIS 1: HEADER COKLAT TUA ================= */}
      <View style={styles.headerRow}>
        
        {/* Kiri - Logo (Flex 1) */}
        <View style={styles.leftSection}>
          <Image 
            source={require('../../../assets/images/logo.png')} 
            style={styles.logoImage} 
          />
        </View>

        {/* Tengah - Welcome Text (Flex 2 biar di tengah persis) */}
        <View style={styles.centerSection}>
          <Text style={styles.welcomeText}>Welcome back Barista</Text>
        </View>

        {/* Kanan - Tombol Logout (Flex 1 biar seimbang sama kiri) */}
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={18} color="#FFF" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        
      </View>

      {/* ================= BARIS 2: NAVBAR KAPSUL TENGAH ================= */}
      <View style={styles.navbarWrapper}>
        <View style={styles.pillContainer}>
          
          <TouchableOpacity 
            style={[styles.pillItem, pathname.includes('dashboard') && styles.pillItemActive]}
            onPress={() => router.replace('/dashboard')}
          >
            <Text style={[styles.pillText, pathname.includes('dashboard') && styles.pillTextActive]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.pillItem, pathname.includes('OrdersTab') && styles.pillItemActive]}
            onPress={() => router.replace('/OrdersTab')}
          >
            <Text style={[styles.pillText, pathname.includes('status') && styles.pillTextActive]}>Status Pemesanan</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.pillItem, pathname.includes('PaymentTab') && styles.pillItemActive]}
            onPress={() => router.replace('./PaymentTab')}
          >
            <Text style={[styles.pillText, pathname.includes('notifikasi') && styles.pillTextActive]}>Notifikasi Pembayaran</Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* ================= BARIS 3: LUBANG KONTEN LUAR ================= */}
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
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  
  // 🚨 SISTEM 1-2-1 BIAR SENTRUM
  leftSection: { 
    flex: 1, 
    alignItems: 'flex-start',
    justifyContent: 'center', 
  },
  centerSection: { 
    flex: 2, 
    alignItems: 'center' 
  },
  rightSection: { 
    flex: 1, 
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  // 🚨 UKURAN LOGO MAX 
  logoImage: { 
    width: 180, // Udah dibikin jauh lebih lebar
    height: 55, // Tingginya disesuaikan biar gak gepeng
    resizeMode: 'contain',
  },
  
  welcomeText: { 
    color: '#FFF', 
    fontSize: 20,
    fontWeight: 'bold', // Sengaja aku tebelin dikit biar seimbang sama logonya
  },
  
  logoutButton: {
    flexDirection: 'row', 
    backgroundColor: '#E53935', 
    paddingVertical: 8, 
    paddingHorizontal: 15, 
    borderRadius: 20, 
    alignItems: 'center'
  },
  logoutText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    marginLeft: 5, 
    fontSize: 14 
  },

  // Styling Kapsul Tengah
  navbarWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#EBE3D5',
    zIndex: 10,
  },
  pillContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#A88B7D', 
    borderRadius: 30, 
    padding: 4 
  },
  pillItem: { 
    paddingVertical: 8, 
    paddingHorizontal: 20, 
    borderRadius: 25 
  },
  pillItemActive: { 
    backgroundColor: '#3E2A1D' 
  },
  pillText: { 
    color: '#FFF', 
    fontSize: 14 
  },
  pillTextActive: { 
    fontWeight: 'bold' 
  },

  // Area Halaman Utama
  contentArea: {
    flex: 1,
  }
});