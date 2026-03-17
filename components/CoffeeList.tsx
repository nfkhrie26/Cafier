import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const dataKopi = [
  { id: 1, nama: 'Coffe Latte', deskripsi: 'Espresso with steamed milk and a layer of foam.', harga: 32000, gambar_url: require('../assets/images/latte.png') },
  { id: 2, nama: 'Iced Americano', deskripsi: 'Espresso with water and ice cubes', harga: 25000, gambar_url: require('../assets/images/americano.png') },
  { id: 3, nama: 'Iced Caramel Latte', deskripsi: 'Espresso with fresh milk, caramel syrup, and ice', harga: 38000, gambar_url: require('../assets/images/caramel.png') },
  { id: 4, nama: 'Dalgona Coffee', deskripsi: 'Whipped coffee cream with fresh milk and ice', harga: 40000, gambar_url: require('../assets/images/Dalgona.png') },
];

const formatRupiah = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

export default function CoffeeList() {
  return (
    <ScrollView style={styles.menuList} showsVerticalScrollIndicator={false}>
      {dataKopi.map((product) => (
        <TouchableOpacity key={product.id} style={styles.productCard}>
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
});