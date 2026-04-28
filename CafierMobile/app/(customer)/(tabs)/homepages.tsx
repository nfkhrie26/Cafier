import ProductList from '@/components/ProductList';
import MainHeader from '@/components/main-header'; // 🚨 Panggil komponen jagoan kita
import api from '@/service/utils';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { styles } from '../../../(style)/homepages.styles';

export default function Homepages() {
  const router = useRouter(); 

  const [dataHomepage, setDataHomepage] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bestSellerIds, setBestSellerIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchSemuaMenu = async () => {
        try {
          const response = await api.get('/products');
          const semuaMenu = response.data.data || response.data; 

          if (semuaMenu && semuaMenu.length > 0) {
            
            // 🚨 LOGIC KOCOK MENU TETEP JALAN
            if (bestSellerIds.length === 0) {
              const shuffledMenu = semuaMenu.sort(() => 0.5 - Math.random());
              const randomBestSellers = shuffledMenu.slice(0, 4);
              
              if (isActive) {
                setDataHomepage(randomBestSellers);
                setBestSellerIds(randomBestSellers.map((item: any) => item._id || item.id)); 
              }
            } 
            else {
              const updatedBestSellers = semuaMenu.filter((item: any) => 
                bestSellerIds.includes(item._id || item.id)
              );

              if (isActive) {
                setDataHomepage(updatedBestSellers);
              }
            }
          }
        } catch (error: any) {
          console.log("Gagal tarik menu homepage:", error.message);
        }
      }

      fetchSemuaMenu();

      return () => {
        isActive = false;
      };
    }, [bestSellerIds])
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* ========================================================= */}
      {/* HEADER OTOMATIS: Gak perlu ribet nulis Ada Wong lagi di sini */}
      {/* ========================================================= */}
      <MainHeader />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContent}>
          
          {/* LOGO TENGAH */}
          <View style={[styles.logoContainer, { height: 100, justifyContent: 'center' }]}>
            <Image 
              source={require('@/assets/images/serene-logo-cokelat.png')} 
              style={{ width: 250, height: 250, resizeMode: 'contain' }} 
            />
          </View>

          {/* PROMO CARD */}
          <View style={styles.promoCard}>
            <View>
              <Text style={styles.promoTitle}>Promotion</Text>
              <Text style={styles.promoDesc}>BUY 1 GET 1{'\n'}Promotion UNTIL{'\n'}30 Desember 2025</Text>
            </View>
            <Image 
              source={require('@/assets/images/promo.png')} 
              style={styles.promoImage} 
            />
          </View>

          <Text style={styles.sectionTitle}>Best seller</Text>
          
          {/* DATA HASIL RANDOM */}
          <ProductList 
            data={dataHomepage} 
            searchQuery={searchQuery} 
            origin='/homepages' 
            numColumns={2} 
          />

          {/* LOGO FOOTER */}
          <View style={[styles.logoContainer, { height: 100, justifyContent: 'center', marginTop: 10, marginBottom: 50 }]}>
            <Image 
              source={require('@/assets/images/serene-logo-cokelat.png')} 
              style={{ width: 250, height: 250, resizeMode: 'contain' }} 
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}