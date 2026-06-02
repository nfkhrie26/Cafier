// MenuScreen.tsx
import ProductList from '@/components/ProductList';
import api, { IMAGE_BASE_URL } from '@/service/utils';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useFocusEffect } from 'expo-router'; 
import React, { useCallback, useState } from 'react'; 
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../(style)/menu.styles';

export default function MenuScreen() {
  const [activeCategory, setActiveCategory] = useState('Coffee');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          const [catRes, prodRes] = await Promise.all([
            api.get('/categories'),
            api.get('/products')
          ]);
          
          if (isActive) {
            setCategories(catRes.data.data);
            setAllProducts(prodRes.data.data);
          }
        } catch (e) {
          console.error("Gagal tarik data Cafier:", e);
        } finally {
          if (isActive) setIsLoading(false);
        }
      };
      
      fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const renderContent = () => {
    if (isLoading) return <ActivityIndicator size="large" color="#D4C4A8" style={{ flex: 1 }} />;
    
    // Filter data berdasarkan kategori aktif
    let currentData = allProducts.filter((item: any) => item.category?.name === activeCategory);

    // 🚨 LOGIKA SORTING BARU: Langsung otomatis diurutin dari harga termurah ke termahal
    currentData.sort((a: any, b: any) => (a.price || 0) - (b.price || 0));

    return (
      <View style={{ flex: 1 }}>
        <ProductList data={currentData} searchQuery={searchQuery} origin='/menu' />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{activeCategory}</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#000" />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Cari menu..." 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.contentContainer}>
        {/* SISI KIRI: Diem (Statik) */}
        <View style={styles.sidebar}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat.name} 
              style={[
                styles.categoryCard, 
                activeCategory === cat.name && { backgroundColor: '#D4C4A8', borderColor: '#A8926D', borderWidth: 1 } 
              ]}
              onPress={() => setActiveCategory(cat.name)}
            >
              <Image source={{ uri: `${IMAGE_BASE_URL}${cat.image}`}} style={styles.categoryImage} />
              <Text style={[styles.categoryText, activeCategory === cat.name && { color: '#574133' }]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SISI KANAN: Gerak (Scrollable lewat ProductList) */}
        <View style={styles.menuArea}>
           {renderContent()}
        </View>
      </View>
    </View>
  );
}