import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../(style)/homepages.styles';

const productData = [
  { 
    id: '1', 
    name: 'Hot Latte', 
    price: 'Rp. 32.000', 
    img: require('../../assets/images/latte.png'),
    imageKey: 'latte',
    desc: 'Espresso with steamed milk and a layer of foam.'
  }, 
  { 
    id: '2', 
    name: 'Americano', 
    price: 'Rp. 25.000', 
    img: require('../../assets/images/americano.png'),
    imageKey: 'americano',
    desc: 'Classic espresso diluted with hot water.'
  },
  { 
    id: '3', 
    name: 'Matcha', 
    price: 'Rp. 40.000', 
    img: require('../../assets/images/Matcha.png'),
    imageKey: 'matcha',
    desc: 'Premium matcha green tea blended with milk.'
  },
  { 
    id: '4', 
    name: 'Milk Choco', 
    price: 'Rp. 40.000', 
    img: require('../../assets/images/cokelat.png'),
    imageKey: 'cokelat',
    desc: 'Rich and creamy chocolate milk.'
  },
  { 
    id: '5', 
    name: 'Mochi', 
    price: 'Rp. 15.000', 
    img: require('../../assets/images/mochi.png'),
    imageKey: 'mochi',
    desc: 'Soft and chewy traditional sweet.'
  },
  { 
    id: '6', 
    name: 'Choco pie', 
    price: 'Rp. 40.000', 
    img: require('../../assets/images/pie.png'),
    imageKey: 'pie',
    desc: 'Crispy pie filled with melted chocolate.'
  },
];

export default function Homepages() {
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        
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

        <View style={styles.scrollContent}>
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
              <TouchableOpacity 
                key={item.id} 
                style={styles.productCard}
                onPress={() => {
                  router.push({
                    pathname: '/rincian',
                    params: {
                      name: item.name,
                      price: item.price.replace(/\D/g, ''), 
                      imageKey: item.imageKey, 
                      desc: item.desc,
                      // Ini penambahan parameter origin-nya
                      origin: '/homepages' 
                    }
                  });
                }}
              >
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
        </View>
      </ScrollView>

    </View>
  );
}