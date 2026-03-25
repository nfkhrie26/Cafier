import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function VouchersScreen() {
  const router = useRouter();

  const handleUseVoucher = (voucherName: string) => {
    // In a real app, you'd apply the voucher to the cart total here.
    // We'll simulate this with an alert and navigation back.
    console.log(`Using voucher: ${voucherName}`);
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vouchers</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* VOUCHER LIST - Simplified based on design */}
        {[
          { 
            name: 'Weekly Free Upsize', 
            description: 'Enjoy 1x FREE Upsize every week to upgrade from Regular to Large for free!',
          },
          { 
            name: 'Monthly Free Sip', 
            description: '1 FREE Iced Americano or Iced Lemon Tea at the start of every month!',
          },
        ].map((voucher, index) => (
          <View key={index} style={styles.voucherCard}>
            {/* Simulation of jagged edge on the left */}
            <View style={styles.jaggedEdge} />
            
            <View style={styles.voucherInfo}>
              <Text style={styles.voucherName}>{voucher.name}</Text>
              <Text style={styles.voucherDesc}>{voucher.description}</Text>
              <TouchableOpacity 
                style={styles.useButton} 
                onPress={() => handleUseVoucher(voucher.name)}
              >
                <Text style={styles.useButtonText}>Use</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* BACK BUTTON */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBE4D5',
  },
  header: {
    backgroundColor: '#4A3525',
    height: 90,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // antisipasi nabrak bottom nav
  },
  voucherCard: {
    backgroundColor: '#F5EFE1',
    borderRadius: 15,
    flexDirection: 'row',
    marginBottom: 20,
    overflow: 'hidden', // and ensure content doesn't bleed out
  },
  jaggedEdge: {
    width: 25,
    backgroundColor: '#EBE4D5', // Matches main background for jagged effect
    // Simplified: For a more advanced jagged edge, use a graphic or custom shape.
  },
  voucherInfo: {
    flex: 1,
    padding: 20,
    paddingLeft: 10,
  },
  voucherName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  voucherDesc: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
    marginBottom: 15,
  },
  useButton: {
    backgroundColor: '#C87A3F',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-end', // Aligns to the right side of the card
  },
  useButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  backBtn: {
    backgroundColor: '#C87A3F',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  backBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});