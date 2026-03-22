import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../(style)/rincian.styles';

const formatRupiah = (number: number) => {
  return "Rp " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Komponen dikeluarin biar gak re-render terus
const OptionButton = ({ label, state, setState }: { label: string, state: string, setState: any }) => (
  <TouchableOpacity 
    style={[styles.optionBtn, state === label && styles.optionBtnActive]} 
    onPress={() => setState(label)}
  >
    <Text style={styles.optionText}>{label}</Text>
  </TouchableOpacity>
);

export default function RincianScreen() {
  const { name, price, desc, imageKey } = useLocalSearchParams();
  const router = useRouter(); 

  const [temperature, setTemperature] = useState('Hot');
  const [size, setSize] = useState('Reguler');
  const [sugar, setSugar] = useState('Normal');
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');

  const images: any = {
    latte: require('../../assets/images/latte.png'),
    americano: require('../../assets/images/americano.png'), 
    caramel: require('../../assets/images/caramel.png'),
    dalgona: require('../../assets/images/Dalgona.png'),
    matcha: require('../../assets/images/Matcha.png'),
    cokelat: require('../../assets/images/cokelat.png'),
    lemon: require('../../assets/images/lemon.png'),
    strawberry: require('../../assets/images/strawberry_sprite.png'),
    mochi: require('../../assets/images/mochi.png'),
    croissant: require('../../assets/images/croissant.png'),
    pie: require('../../assets/images/pie.png'),
    redvelvet: require('../../assets/images/redvelvet.png'),
  };

  const itemName = name ? String(name) : 'Coffee Latte';
  const itemPrice = price ? Number(price) : 32000;
  const itemDesc = desc ? String(desc) : 'Espresso with steamed milk and a layer of foam.';
  const itemImg = imageKey && images[String(imageKey)] ? images[String(imageKey)] : images['latte'];

  const isDessert = ['mochi', 'croissant', 'pie', 'redvelvet'].includes(String(imageKey));
  const isColdOnly = ['strawberry'].includes(String(imageKey));

  return (
    <View style={styles.container}>
      
      {/* HEADER STUCK */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{itemName}</Text>
      </View>

      {/* SCROLLVIEW UDAH DITAMBAHIN MANTRA BIAR PANJANG */}
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { flexGrow: 1, paddingBottom: 150 }]} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.productInfo}>
          <Image 
            source={itemImg} 
            style={styles.productImage} 
          />
          <View style={styles.productDesc}>
            <Text style={styles.descText}>{itemDesc}</Text>
            <Text style={styles.priceText}>{formatRupiah(itemPrice)}</Text>
          </View>
        </View>

        {!isDessert && (
          <>
            {!isColdOnly && (
              <>
                <Text style={styles.sectionTitle}>Temperature</Text>
                <View style={styles.row}>
                  <OptionButton label="Hot" state={temperature} setState={setTemperature} />
                  <OptionButton label="Cold" state={temperature} setState={setTemperature} />
                </View>
              </>
            )}

            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.row}>
              <OptionButton label="Small" state={size} setState={setSize} />
              <OptionButton label="Reguler" state={size} setState={setSize} />
              <OptionButton label="Large" state={size} setState={setSize} />
            </View>

            <Text style={styles.sectionTitle}>Sugar Level</Text>
            <View style={styles.row}>
              <OptionButton label="Normal" state={sugar} setState={setSugar} />
              <OptionButton label="Less" state={sugar} setState={setSugar} />
              <OptionButton label="No Sugar" state={sugar} setState={setSugar} />
            </View>
          </>
        )}

        <Text style={styles.sectionTitle}>Order Instruction</Text>
        <TextInput
          style={styles.input}
          placeholder="Tulis catatan di sini..."
          value={notes}
          onChangeText={setNotes}
          multiline={true} 
        />
      </ScrollView>
      {/* BOTTOM ACTION (ADD TO CART) */}
      {/* Kasih marginBottom 90 biar ngangkat dari bawah! */}
      <View style={[styles.bottomAction, { marginBottom: 90 }]}>
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))}>
            <Text style={styles.qtyBtn}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity onPress={() => setQty(qty + 1)}>
            <Text style={styles.qtyBtn}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.addToCartText}>Add to Card - {formatRupiah(itemPrice * qty)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}