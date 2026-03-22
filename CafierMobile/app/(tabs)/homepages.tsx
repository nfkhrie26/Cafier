import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../(style)/homepages.styles';

const productData = [
  { id: '1', name: 'Hot Latte', price: 'Rp. 32.000', img: require('../../assets/images/latte.png') }, 
  { id: '2', name: 'Americano', price: 'Rp. 25.000', img: require('../../assets/images/americano.png') },
  { id: '3', name: 'Matcha', price: 'Rp. 40.000', img: require('../../assets/images/Matcha.png') },
  { id: '4', name: 'Milk Choco', price: 'Rp. 40.000', img: require('../../assets/images/cokelat.png') },
  { id: '5', name: 'Mochi', price: 'Rp. 15.000', img: require('../../assets/images/mochi.png') },
  { id: '6', name: 'Choco pie', price: 'Rp. 40.000', img: require('../../assets/images/pie.png') },
];

export default function Homepages() {
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Welcome Back Ada</Text>
          <Text style={styles.emailText}>Adawong@gmail.com</Text>
        </View>
        <Image 
          source={require('../../assets/images/adawong.jpg')} 
          style={styles.profilePic} 
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.logoContainer, { height: 100, justifyContent: 'center' }]}>
          <Image 
            source={require('../../assets/images/serene-logo-cokelat.png')} 
            style={{ width: 250, height: 250, resizeMode: 'contain' }} 
          />
        </View>

        <View style={styles.promoCard}>
          <View>
            <Text style={styles.promoTitle}>Promotion</Text>
            <Text style={styles.promoDesc}>BUY 1 GET 1{'\n'}Promotion UNTIL{'\n'}30 Desember 2025</Text>
          </View>
          <Image 
            source={require('../../assets/images/promo.png')} 
            style={styles.promoImage} 
          />
        </View>

        <Text style={styles.sectionTitle}>Best seller</Text>

        <View style={styles.productGrid}>
          {productData.map((item) => (
            <TouchableOpacity key={item.id} style={styles.productCard}>
              <Image source={item.img} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.logoContainer, { height: 100, justifyContent: 'center', marginTop: 10, marginBottom: 50 }]}>
          <Image 
            source={require('../../assets/images/serene-logo-cokelat.png')} 
            style={{ width: 250, height: 250, resizeMode: 'contain' }} 
          />
        </View>
      </ScrollView>

      {/* <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home" size={30} color="#33241C" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push('/menu')}>
          <Ionicons name="search" size={30} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity >
          <Ionicons name="cart" size={30} color="#FFF" /></TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={30} color="#FFF" /></TouchableOpacity>
      </View> */}
    </View>
  );
}