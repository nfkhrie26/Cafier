import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../(style)/menu.styles';

import CoffeeList from '@/components/CoffeeList';
import DessertList from '@/components/DessertList';
import NonCoffeeList from '@/components/NonCoffeeList';

const categories = [
  { id: '1', name: 'Coffee', img: require('../../assets/images/latte.png') },
  { id: '2', name: 'Non Coffee', img: require('../../assets/images/Matcha.png') }, 
  { id: '3', name: 'Desserts', img: require('../../assets/images/mochi.png') },
];

export default function MenuScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('1');
  
  // state baru buat nyimpen teks pencarian
  const [searchQuery, setSearchQuery] = useState('');

  const renderContent = () => {
    // lempar teks pencariannya ke dalam list
    if (activeCategory === '1') return <CoffeeList searchQuery={searchQuery} />;
    if (activeCategory === '2') return <NonCoffeeList searchQuery={searchQuery} />;
    if (activeCategory === '3') return <DessertList searchQuery={searchQuery} />;
    return null;
  };

  const getHeaderTitle = () => {
    if (activeCategory === '1') return 'Coffee';
    if (activeCategory === '2') return 'Non Coffee';
    if (activeCategory === '3') return 'Desserts';
    return 'Menu';
  };

  const getSearchPlaceholder = () => {
    if (activeCategory === '1') return 'Latte';
    if (activeCategory === '2') return 'Matcha';
    if (activeCategory === '3') return 'Mochi'; 
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
        
        {/* SIDEBAR KIRI (Kategori) */}
        <View style={styles.sidebar}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              style={[
                styles.categoryCard, 
                activeCategory === cat.id && { backgroundColor: '#D4C4A8', borderColor: '#A8926D', borderWidth: 1 } 
              ]}
              onPress={() => {
                setActiveCategory(cat.id);
                setSearchQuery(''); // kosongin pencarian pas pindah kategori
              }}
            >
              <Image source={cat.img} style={styles.categoryImage} />
              <Text style={[styles.categoryText, activeCategory === cat.id && { color: '#574133' }]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flex: 1 }}>
           {renderContent()}
        </View>

      </View>

      {/* <View style={styles.bottomNav}> ... </View> */}
    </View>
  );
}