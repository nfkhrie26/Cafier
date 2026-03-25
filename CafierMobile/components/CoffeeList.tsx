import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const dataKopi = [
  { id: 1, nama: 'Latte', deskripsi: 'Espresso with steamed milk and a layer of foam', harga: 32000, gambar_url: require('../assets/images/latte.png'), imageKey: 'latte' },
  { id: 2, nama: 'Americano', deskripsi: 'Espresso with water', harga: 25000, gambar_url: require('../assets/images/americano.png'), imageKey: 'americano' },
  { id: 3, nama: 'Caramel Latte', deskripsi: 'Espresso with fresh milk, caramel syrup', harga: 38000, gambar_url: require('../assets/images/caramel.png'), imageKey: 'caramel' },
  { id: 4, nama: 'Dalgona Coffee', deskripsi: 'Whipped coffee cream with fresh milk', harga: 40000, gambar_url: require('../assets/images/Dalgona.png'), imageKey: 'dalgona' }, 
];

const formatRupiah = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

// di sini i tambahin penerima searchQuery dari menu
export default function CoffeeList({ searchQuery = '' }: { searchQuery?: string }) {
  
  // ini fungsi buat nyaring daftar kopinya
  const filteredData = dataKopi.filter((item) => 
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ini yang muncul kalau kopinya ga ada
  if (filteredData.length === 0) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Menu tidak ditemukan di kategori ini</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.menuList} showsVerticalScrollIndicator={false}>
      {filteredData.map((product) => (
        <TouchableOpacity 
          key={product.id} 
          style={styles.productCard}
          onPress={() => {
            router.push({
              pathname: '/rincian',
              params: { 
                name: product.nama, 
                price: product.harga, 
                desc: product.deskripsi,
                imageKey: product.imageKey,
                // Ini tambahannya biar dia tahu asalnya dari menu
                origin: '/menu'
              }
            });
          }}
        >
          <Image source={product.gambar_url} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.nama}</Text>
            <Text style={styles.productDesc}>{product.deskripsi}</Text>
            <Text style={styles.productPrice}>{formatRupiah(product.harga)}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuList: { flex: 1 },
  productCard: { backgroundColor: '#F5EFE1', borderRadius: 15, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  productImage: { width: 60, height: 60, resizeMode: 'contain' },
  productInfo: { flex: 1, marginLeft: 10 },
  productName: { fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  productDesc: { fontSize: 11, color: '#555', marginBottom: 6, lineHeight: 14 },
  productPrice: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  // tambahan style buat not found
  notFoundContainer: { flex: 1, alignItems: 'center', marginTop: 50, paddingHorizontal: 10 },
  notFoundText: { fontSize: 14, color: '#888', textAlign: 'center' }
});