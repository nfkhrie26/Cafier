import { Stack, useRouter, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { Image, ScrollView, Text, View, Platform, StatusBar } from 'react-native';
import { styles } from '../../(style)/homepages.styles';
import api from '@/service/utils';
import ProductList from '@/components/ProductList';

export default function Homepages() {
  const router = useRouter(); 

  // 1. 🚨 STATE HARUS DI DALEM SINI BRO!
  const [dataHomepage, setDataHomepage] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [bestSellerIds, setBestSellerIds] = useState<string[]>([]);
  // 2. 🚨 PAKE useFocusEffect Biar auto-refresh pas balik dari halaman Checkout
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchSemuaMenu = async () => {
        try {
          const response = await api.get('/products');
          const semuaMenu = response.data.data || response.data; 

          if (semuaMenu && semuaMenu.length > 0) {
            
            // 🚨 CEK: Kalo ID-nya belom ada, berarti ini pertama kali buka aplikasi (Kocok Menu!)
            if (bestSellerIds.length === 0) {
              const shuffledMenu = semuaMenu.sort(() => 0.5 - Math.random());
              const randomBestSellers = shuffledMenu.slice(0, 4);
              
              if (isActive) {
                setDataHomepage(randomBestSellers);
                // SIMPEN ID-NYA BIAR GAK LUPA!
                setBestSellerIds(randomBestSellers.map((item: any) => item._id || item.id)); 
              }
            } 
            
            // 🚨 Kalo ID-nya UDAH ADA, jangan dikocok lagi! Cukup tarik data terbaru buat update stok.
            else {
              // Filter data terbaru dari API, cocokin sama ID yang udah kita simpen
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
    }, [bestSellerIds]) // 🚨 Jangan lupa masukin bestSellerIds ke dalem array dependency ini
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* ========================================================= */}
      {/* HEADER STUCK: Di-luar ScrollView biar nempel atas */}
      {/* ========================================================= */}
      <View style={[styles.header, { 
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 15 : 50 
      }]}>
        <View>
          <Text style={styles.greetingText}>Welcome Back Ada</Text>
          <Text style={styles.emailText}>Adawong@gmail.com</Text>
        </View>
        <Image 
          source={require('@/assets/images/adawong.jpg')} 
          style={styles.profilePic} 
        />
      </View>

      {/* ========================================================= */}
      {/* SCROLLVIEW: Cuma bagian bawahnya aja yang digulung */}
      {/* ========================================================= */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContent}>
          {/* LOGO */}
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
          
          {/* 🚨 TAMPILIN DATA HASIL RANDOM */}
          <ProductList 
            data={dataHomepage} 
            searchQuery={searchQuery} 
            origin='/homepages' 
            numColumns={2} // 🚨 SIHIRNYA DI SINI!
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