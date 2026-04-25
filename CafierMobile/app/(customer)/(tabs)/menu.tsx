import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { styles } from '../../(style)/menu.styles';
import api from '@/service/utils';
import ProductList from '@/components/ProductList';
import { useFocusEffect } from 'expo-router';
import { IMAGE_BASE_URL } from '@/service/utils';

// const categories = [
//   { id: '1', name: 'Coffee', img: require('@/assets/images/latte.png') },
//   { id: '2', name: 'Non Coffee', img: require('@/assets/images/Matcha.png') }, 
//   { id: '3', name: 'Desserts', img: require('@/assets/images/mochi.png') },
// ];

export default function MenuScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Coffee');
  const [searchQuery, setSearchQuery] = useState('');

  const [dataKopi, setDataKopi] = useState<any[]>([]);
  const [dataNonKopi, setDataNonKopi] = useState<any[]>([]);
  const [dataDessert, setDataDessert] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<any>(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try{
        const response = await api.get('/categories');
        const semuaCategory = response.data.data;

        setCategories(semuaCategory);
      } catch (error: any) {
        console.error('❌ GAGAL NARIK DATA!');
        console.error('Pesan Error:', error.message);
      } finally {
        setIsLoading(false);
      }};

    const fetchMenu = async () => {
      try {
        const response = await api.get('/products');
        console.log("API BERHASIL! Ini balasan mentahnya:", response.data); // CCTV 2
        
        const semuaMenu = response.data.data;
        console.log("3. Jumlah menu yang ditarik:", semuaMenu?.length); // CCTV 3

        if(semuaMenu && semuaMenu.length > 0) {
            console.log("4. Contoh isi 1 barang:", JSON.stringify(semuaMenu[0], null, 2)); // CCTV 4
        }

        setDataKopi(semuaMenu.filter((item: any) => item.category?.name === 'Coffee'));
        setDataNonKopi(semuaMenu.filter((item: any) => item.category?.name === 'Non Coffee'));
        setDataDessert(semuaMenu.filter((item: any) => item.category?.name === 'Desserts'));
        
        console.log("5. Selesai misahin data!"); // CCTV 5

      } catch (error: any) {
        console.error('❌ GAGAL NARIK DATA!');
        console.error('Pesan Error:', error.message);
        
        if (error.response) {
            console.error('Status dari Laravel:', error.response.status);
            console.error('Balasan dari Laravel:', error.response.data);
        } else if (error.request) {
            console.error('Kagak ada balasan sama sekali dari server. Cek IP/Ngrok lu!');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
    fetchMenu();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#D4C4A8" />
          <Text style={{ marginTop: 10, color: '#888' }}>Menyiapkan hidangan...</Text>
        </View>
      );
    }
    
    let currentData: any[] = [];
    if (activeCategory === 'Coffee') currentData = dataKopi;
    if (activeCategory === 'Non Coffee') currentData = dataNonKopi;
    if (activeCategory === 'Desserts') currentData = dataDessert;

    return <ProductList data={currentData} searchQuery={searchQuery} origin='/menu' />;
  };

  const getHeaderTitle = () => {
    if (activeCategory === 'Coffee') return 'Coffee';
    if (activeCategory === 'Non Coffee') return 'Non Coffee';
    if (activeCategory === 'Desserts') return 'Desserts';
    return 'Menu';
  };

  const getSearchPlaceholder = () => {
    if (activeCategory === 'Coffee') return 'Latte';
    if (activeCategory === 'Non Coffee') return 'Matcha';
    if (activeCategory === 'Desserts') return 'Mochi'; 
    return 'Search...';
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#000" />
        <TextInput 
          style={[styles.searchInput, { outlineStyle: 'none' } as any]} 
          placeholder={getSearchPlaceholder()} 
          placeholderTextColor="#888" 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.contentContainer}>
        
        {/* SIDEBAR KIRI */}
        <View style={styles.sidebar}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat.name} 
              style={[
                styles.categoryCard, 
                activeCategory === cat.name && { backgroundColor: '#D4C4A8', borderColor: '#A8926D', borderWidth: 1 } 
              ]}
              onPress={() => {
                setActiveCategory(cat.name);
                setSearchQuery(''); 
              }}
            >
              <Image source={{ uri: `${IMAGE_BASE_URL}${cat.image}`}} style={styles.categoryImage} />
              <Text style={[styles.categoryText, activeCategory === cat.name && { color: '#574133' }]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flex: 1 }}>
           {/* Di sini komponen list-nya bakal kerender! */}
           {renderContent()}
        </View>

      </View>
    </View>
  );
}