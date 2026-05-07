import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '@/context/cart-context';
import { useVouchers, Voucher } from '@/context/voucher-context';

export default function VouchersScreen() {
  const router = useRouter();
  
  const { claimedVouchers } = useVouchers(); 
  // 🚨 FIX: Ambil juga fungsi addToCart (atau addItem) dari useCart kamu
  const { applyVoucher, selectedVoucher, addToCart } = useCart(); 

  const availableToUse = claimedVouchers.filter(v => v.id !== selectedVoucher?.id);

  const handleUseVoucher = (voucher: Voucher) => {
    applyVoucher(voucher); 
    
    // 🚨 LOGIKA BARU: Cek kalau vouchernya ngasih Ice Americano gratis
    const titleLowerCase = voucher.title.toLowerCase();
    const descLowerCase = voucher.desc.toLowerCase();
    
    if (titleLowerCase.includes('monthly') || descLowerCase.includes('americano')) {
      
      // Bikin objek minuman gratisnya
      const freeAmericano = {
        id: 'free-americano-001', // Kasih ID khusus biar gak bentrok sama menu biasa
        cartItemId: Date.now().toString(), // 🚨 FIX ERROR TS: Kasih ID unik buat di keranjang
        name: 'Ice Americano',
        price: 0, // Karena gratis!
        qty: 1,
        quantity: 1, 
        notes: 'Regular - Free Monthly Voucher',
        // Opsional: Kalau di cart nampilin gambar, kasih URL atau default icon
        image: 'https://cdn-icons-png.flaticon.com/512/3054/3054889.png', 
        product: {
            name: 'Ice Americano'
        },
        variantDetails: [], // 🚨 FIX ERROR TS: Array kosong karena ini minuman default gratis
      };

      // 🚨 Panggil fungsi penambah keranjang
      // Catatan: Kalau di cart-context kamu namanya 'addItem', ganti addToCart jadi addItem ya!
      if (addToCart) {
          addToCart(freeAmericano as any); // Tambahan 'as any' buat jaga-jaga kalau tipe datanya masih rewel
      }
    }
    
    // Paksa langsung ke halaman checkout
    router.push('../checkout');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Vouchers</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        
        {availableToUse.length > 0 ? (
          availableToUse.map((voucher: Voucher) => (
            <View key={voucher.id} style={styles.voucherCard}>
              <View style={styles.jaggedEdge} />
              
              <View style={styles.voucherInfo}>
                <Text style={styles.voucherName}>{voucher.title}</Text>
                <Text style={styles.voucherDesc}>{voucher.desc}</Text>
                
                <TouchableOpacity 
                  style={styles.useButton} 
                  onPress={() => handleUseVoucher(voucher)}
                >
                  <Text style={styles.useButtonText}>Use</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {selectedVoucher ? "Voucher kamu sedang aktif dipasang!" : "Belum ada voucher yang bisa dipakai."}
            </Text>
            <Text style={styles.emptySubText}>Cek halaman Benefits untuk claim hadiahmu!</Text>
          </View>
        )}

        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('../checkout')}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EBE4D5' },
  header: { backgroundColor: '#4A3525', height: 90, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  voucherCard: { backgroundColor: '#F5EFE1', borderRadius: 15, flexDirection: 'row', marginBottom: 20, overflow: 'hidden', elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  jaggedEdge: { width: 25, backgroundColor: '#EBE4D5' },
  voucherInfo: { flex: 1, padding: 20, paddingLeft: 10 },
  voucherName: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#33241C' },
  voucherDesc: { fontSize: 12, color: '#555', lineHeight: 18, marginBottom: 15 },
  useButton: { backgroundColor: '#C87A3F', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8, alignSelf: 'flex-end' },
  useButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', marginTop: 100, paddingHorizontal: 40 },
  emptyText: { color: '#4A3525', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  emptySubText: { color: '#888', fontSize: 13, textAlign: 'center', marginTop: 8 },
  backBtn: { backgroundColor: '#C87A3F', paddingVertical: 15, borderRadius: 15, alignItems: 'center', marginTop: 20, marginBottom: 30 },
  backBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});