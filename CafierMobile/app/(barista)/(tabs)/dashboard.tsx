import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";

// IMPORT KOMPONEN TAB KITA
import HomeTab from '@/components/HomeTab';
import OrdersTab from '@/components/OrdersTab';
import PaymentTab from '@/components/PaymentTab';

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('Home');

  // FUNGSI LOGOUT DENGAN KONFIRMASI
  // const handleLogout = () => {
  //   Alert.alert(
  //     "Konfirmasi Logout",
  //     "Apakah Anda yakin ingin keluar dari Serene Cafe?",
  //     [
  //       { text: "Batal", style: "cancel" },
  //       { text: "Logout", onPress: () => router.replace('../../../(auth)/login'), style: "destructive" }
  //     ]
  //   );
  // };

    const handleLogout = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");

      await axios.post(
        "https://trinity-milliary-mitzie.ngrok-free.dev/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    } catch (e) {
      console.log("skip");
    } finally {
      await SecureStore.deleteItemAsync("userToken");
      router.replace("../../../(auth)/login");
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#422918" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('@/assets/images/serene-logo.png')} style={styles.headerLogo} resizeMode="contain" />
        </View>
        <Text style={styles.headerTitle}>Welcome back Barista</Text>
        
        {/* Kanan: Profil Aja (Logout udah dipindah ke bawah) */}
        <View style={styles.headerRight}>
          <Image source={require('@/assets/images/adawong.jpg')} style={styles.profilePic} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* BARIS KONTROL: TABS DI TENGAH, LOGOUT DI KANAN */}
        <View style={styles.controlsWrapper}>
          
          {/* TABS (Tetap di tengah) */}
          <View style={styles.tabContainer}>
            {['Home', 'Status Pemesanan', 'Notifikasi Pembayaran'].map((tab) => (
              <TouchableOpacity 
                key={tab} 
                style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* TOMBOL LOGOUT (Mentok Kanan, Sejajar Tab) */}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color="#FFF" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

        </View>

        {/* RENDER KOMPONEN BERDASARKAN TAB YANG DIPILIH */}
        {activeTab === 'Home' && <HomeTab />}
        {activeTab === 'Status Pemesanan' && <OrdersTab />}
        {activeTab === 'Notifikasi Pembayaran' && <PaymentTab />}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#EAE0D1' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: '#422918', 
    paddingHorizontal: 30, 
    // INI YANG BIKIN TURUN PAS DI BAWAH JAM & BATERAI:
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 15 : 15,
    paddingBottom: 15 
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerLogo: { width: 100, height: 60, transform: [{ scale: 1.8 }], marginRight: 10, tintColor: '#FFF' },
  headerTitle: { color: '#FFF', fontSize: 32, fontWeight: 'normal' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  profilePic: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#BD783D' },
  
  scrollContent: { padding: 30, alignItems: 'center', paddingBottom: 100 },

  controlsWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative', 
  },
  tabContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#A08069', 
    borderRadius: 30, 
    padding: 5 
  },
  tabButton: { paddingVertical: 12, paddingHorizontal: 25, borderRadius: 25 },
  tabButtonActive: { backgroundColor: '#422918' },
  tabText: { color: '#FFF', fontSize: 16, opacity: 0.8 },
  tabTextActive: { opacity: 1, fontWeight: 'bold' },

  logoutButton: {
    position: 'absolute', 
    right: 0,             
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3, 
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  }
});