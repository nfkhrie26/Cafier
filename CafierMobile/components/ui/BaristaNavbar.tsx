import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

// Terima URL dari Layout
interface BaristaNavbarProps {
  activePath: string;
}

export default function BaristaNavbar({ activePath }: BaristaNavbarProps) {
  const router = useRouter();

  return (
    <View style={styles.pillContainer}>
      
      {/* 1. Tombol Home */}
      <TouchableOpacity 
        style={[styles.pillItem, activePath.includes('dashboard') && styles.pillItemActive]}
        onPress={() => router.replace('../(barista)/(tabs)/dashboard')}
      >
        <Text style={[styles.pillText, activePath.includes('dashboard') && styles.pillTextActive]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* 2. Tombol Status Pemesanan */}
      <TouchableOpacity 
        style={[styles.pillItem, activePath.includes('status') && styles.pillItemActive]}
        onPress={() => router.replace('../(barista)/(tabs)/OrderTabs')}
      >
        <Text style={[styles.pillText, activePath.includes('status') && styles.pillTextActive]}>
          Status Pemesanan
        </Text>
      </TouchableOpacity>

      {/* 3. Tombol Notifikasi */}
      <TouchableOpacity 
        style={[styles.pillItem, activePath.includes('notifikasi') && styles.pillItemActive]}
        onPress={() => router.replace('../(barista)/(tabs)/PaymentTab')}
      >
        <Text style={[styles.pillText, activePath.includes('notifikasi') && styles.pillTextActive]}>
          Notifikasi Pembayaran
        </Text>
      </TouchableOpacity>

    </View>
  );
}

// ... (style lu sama persis kayak yang sebelumnya)
const styles = StyleSheet.create({
  pillContainer: { flexDirection: 'row', backgroundColor: '#A88B7D', borderRadius: 30, padding: 4 },
  pillItem: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 25 },
  pillItemActive: { backgroundColor: '#3E2A1D' },
  pillText: { color: '#FFF', fontSize: 14, textAlign: 'center' },
  pillTextActive: { fontWeight: 'bold' },
});