import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IMAGE_BASE_URL } from '@/service/utils';

const formatRupiah = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

export default function ProductList({ data = [], searchQuery = '' }: { data?: any[], searchQuery?: string }) {
  
  const filteredData = data.filter((item) => {
    return item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (filteredData.length === 0) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Menu tidak ditemukan di kategori ini</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.menuList} showsVerticalScrollIndicator={false}>
      {filteredData.map((product) => {
        
        let isTersedia = true;
        let pesanHabis = '';
        console.log("CCTV DATA PRODUK:", product);

        if (product.stock !== undefined && product.stock !== null) {
            isTersedia = product.stock > 0;
            pesanHabis = 'Stok Habis';
        } else if (product.is_available !== undefined) {
            isTersedia = product.is_available === true;
            pesanHabis = 'Tidak Tersedia';
        }

        return (
          <TouchableOpacity 
            // 1. Ganti key-nya jadi _id
            key={product._id} 
            style={[styles.productCard, !isTersedia && { opacity: 0.5 }]}
            disabled={!isTersedia} 
            
            onPress={() => {
              router.push({
                pathname: '/rincian',
                params: { 
                  id: product.id, 
                  name: product.name, 
                  price: product.price, 
                  desc: product.description,
                  imageUrl: product.image,
                  variants: JSON.stringify(product.variants || []),
                  origin: '/menu'
                }
              });
            }}
          >
            <View>
              <Image 
                source={{ uri: `${IMAGE_BASE_URL}${product.image}` }} 
                style={styles.productImage} 
              />
              
              {/* 🚨 TAMPILAN TAMBAHAN: Kasih label merah kalo habis */}
              {!isTersedia && (
                  <View style={styles.overlayHabis}>
                      <Text style={styles.textHabis}>{pesanHabis}</Text>
                  </View>
              )}
            </View>
            
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDesc}>{product.description}</Text>
              <Text style={styles.productPrice}>{formatRupiah(product.price)}</Text>
              
              {/* Boleh juga nampilin sisa stok buat Dessert biar user tau */}
              {product.stock !== undefined && product.stock !== null && isTersedia && (
                <Text style={styles.stockText}>Sisa: {product.stock}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuList: { flex: 1 },
  productCard: { backgroundColor: '#F5EFE1', borderRadius: 15, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  productImage: { width: 60, height: 60, resizeMode: 'cover', borderRadius: 10 }, 
  productInfo: { flex: 1, marginLeft: 10 },
  productName: { fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  productDesc: { fontSize: 11, color: '#555', marginBottom: 6, lineHeight: 14 },
  productPrice: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  notFoundContainer: { flex: 1, alignItems: 'center', marginTop: 50, paddingHorizontal: 10 },
  notFoundText: { fontSize: 14, color: '#888', textAlign: 'center' },
  
  overlayHabis: {
      ...StyleSheet.absoluteFillObject, // Bikin posisinya numpuk di atas gambar
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  textHabis: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingHorizontal: 2,
  },
  stockText: {
      fontSize: 11,
      color: '#C87A3F', // Warna tema Cafier lu
      marginTop: 4,
      fontWeight: 'bold'
  }
});