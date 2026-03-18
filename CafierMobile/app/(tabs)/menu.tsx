import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../(style)/menu.styles';


import CoffeeList from '@/components/CoffeeList';
import DessertList from '@/components/DessertList';
import NonCoffeeList from '@/components/NonCoffeeList';

const categories = [
  { id: '1', name: 'COFFEE', img: require('../../assets/images/latte.png') },
  { id: '2', name: 'Non Coffee', img: require('../../assets/images/Matcha.png') }, 
  { id: '3', name: 'Desserts', img: require('../../assets/images/mochi.png') },
];

export default function MenuScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('1');


  const renderContent = () => {
    if (activeCategory === '1') return <CoffeeList />;
    if (activeCategory === '2') return <NonCoffeeList />;
    if (activeCategory === '3') return <DessertList />;
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
    if (activeCategory === '3') return 'Matcha'; 
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
          style={styles.searchInput} 
          placeholder={getSearchPlaceholder()} 
          placeholderTextColor="#888" 
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
              onPress={() => setActiveCategory(cat.id)}
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


      {/* <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push('/homepages')}><Ionicons name="home" size={30} color="#FFF" /></TouchableOpacity>
        <TouchableOpacity ><Ionicons name="search" size={30} color="#33241C" /></TouchableOpacity>
        <TouchableOpacity ><Ionicons name="cart" size={30} color="#FFF" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="person-circle-outline" size={30} color="#FFF" /></TouchableOpacity>
      </View> */}
    </View>
  );
}