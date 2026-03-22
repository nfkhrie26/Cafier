import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const dataDessert = [
  { id: 9, nama: 'Mochi', deskripsi: 'Glutinous rice flour with red bean or fruit filling', harga: 15000, gambar_url: require('../assets/images/mochi.png'), imageKey: 'mochi' },
  { id: 10, nama: 'Croissant', deskripsi: 'Wheat flour with butter and yeast', harga: 25000, gambar_url: require('../assets/images/croissant.png'), imageKey: 'croissant' }, 
  { id: 11, nama: 'Pie', deskripsi: 'Graham crust with whipped cream', harga: 22000, gambar_url: require('../assets/images/pie.png'), imageKey: 'pie' },
  { id: 12, nama: 'Red Velvet Cake', deskripsi: 'Red cocoa sponge with cream cheese frosting', harga: 25000, gambar_url: require('../assets/images/redvelvet.png'), imageKey: 'redvelvet' }, 
];

const formatRupiah = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

// tangkep searchQuery di sini
export default function DessertList({ searchQuery = '' }: { searchQuery?: string }) {
  
  // nyaring data dessert
  const filteredData = dataDessert.filter((item) => 
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // nampilin teks ini kalau dessert yang dicari ga ada
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
                imageKey: product.imageKey 
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
  // style buat not found
  notFoundContainer: { flex: 1, alignItems: 'center', marginTop: 50, paddingHorizontal: 10 },
  notFoundText: { fontSize: 14, color: '#888', textAlign: 'center' }
});