import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const dataNonKopi = [
  { id: 5, nama: 'Matcha Latte', deskripsi: 'Matcha powder with fresh milk and ice', harga: 40000, gambar_url: require('../assets/images/Matcha.png'), imageKey: 'matcha' },
  { id: 6, nama: 'Milk Chocolate', deskripsi: 'Cocoa powder with fresh milk, ice, and whipped cream', harga: 40000, gambar_url: require('../assets/images/cokelat.png'), imageKey: 'cokelat' },
  { id: 7, nama: 'Lemon Tea', deskripsi: 'Black tea with fresh lemon slices, sugar, and ice.', harga: 22000, gambar_url: require('../assets/images/lemon.png'), imageKey: 'lemon' },
  { id: 8, nama: 'Strawberry Sprite', deskripsi: 'Sprite with strawberry syrup, fresh strawberries, and ice.', harga: 25000, gambar_url: require('../assets/images/strawberry_sprite.png'), imageKey: 'strawberry' }, 
];

const formatRupiah = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

// tambahin penangkap searchQuery
export default function NonCoffeeList({ searchQuery = '' }: { searchQuery?: string }) {
  
  // nyaring data non kopi
  const filteredData = dataNonKopi.filter((item) => 
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // tampilan kalau ga nemu
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
                // Ini tambahan originnya
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
  notFoundContainer: { flex: 1, alignItems: 'center', marginTop: 50, paddingHorizontal: 10 },
  notFoundText: { fontSize: 14, color: '#888', textAlign: 'center' }
});