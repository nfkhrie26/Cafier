import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const dataNonKopi = [
  { id: 5, nama: 'Iced Matcha Latte', deskripsi: 'Matcha powder with fresh milk and ice', harga: 40000, gambar_url: require('../assets/images/Matcha.png') },
  { id: 6, nama: 'Iced Chocolate', deskripsi: 'Cocoa powder with fresh milk, ice, and whipped cream', harga: 40000, gambar_url: require('../assets/images/cokelat.png') },
  { id: 7, nama: 'Iced Lemon Tea', deskripsi: 'Black tea with fresh lemon slices, sugar, and ice.', harga: 22000, gambar_url: require('../assets/images/lemon.png') },
  { id: 8, nama: 'Strawberry Sprite', deskripsi: 'Sprite with strawberry syrup, fresh strawberries, and ice.', harga: 25000, gambar_url: require('../assets/images/strawberry_sprite.png') }, 
];

const formatRupiah = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

export default function NonCoffeeList() {
  return (
    <ScrollView style={styles.menuList} showsVerticalScrollIndicator={false}>
      {dataNonKopi.map((product) => (
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