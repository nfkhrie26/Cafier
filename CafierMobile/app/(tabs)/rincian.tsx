import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../(style)/rincian.styles';
import { useCart } from '../../context/cart-context';

// Move constants outside to prevent re-allocation on each render
const formatRupiah = (number: number) => {
  return "Rp " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const IMAGES: Record<string, any> = {
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

const DESSERTS = ['mochi', 'croissant', 'pie', 'redvelvet'];
const COLD_ONLY = ['strawberry'];

const OptionButton = ({ label, state, setState }: { label: string, state: string, setState: any }) => (
  <TouchableOpacity
    style={[styles.optionBtn, state === label && styles.optionBtnActive]}
    onPress={() => setState(label)}
  >
    <Text style={styles.optionText}>{label}</Text>
  </TouchableOpacity>
);

export default function RincianScreen() {
  const { name, price, desc, imageKey, origin } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [temperature, setTemperature] = useState('Hot');
  const [size, setSize] = useState('Reguler');
  const [sugar, setSugar] = useState('Normal');
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');

  const itemName = name ? String(name) : 'Coffee Latte';
  const itemPrice = useMemo(() => price ? Number(price) : 32000, [price]);
  const itemDesc = desc ? String(desc) : 'Espresso with steamed milk and a layer of foam.';
  const itemImg = imageKey && IMAGES[String(imageKey)] ? IMAGES[String(imageKey)] : IMAGES['latte'];

  const isDessert = DESSERTS.includes(String(imageKey));
  const isColdOnly = COLD_ONLY.includes(String(imageKey));

  const handleAddToCart = () => {
    const newItem = {
      // Added notes to ID so same drinks with different instructions don't merge incorrectly
      id: `${imageKey}-${temperature}-${size}-${sugar}-${notes.substring(0, 10)}`,
      name: itemName,
      price: itemPrice,
      qty: qty,
      image: itemImg,
      temp: isDessert ? undefined : temperature,
      size: isDessert ? undefined : size,
      sugar: isDessert ? undefined : sugar,
      desc: isDessert ? itemDesc : undefined,
      isDessert: isDessert,
      notes: notes
    };

    addToCart(newItem);

    if (origin) {
      router.push(String(origin) as any);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => origin ? router.push(String(origin) as any) : router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{itemName}</Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { flexGrow: 1, paddingBottom: 150 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.productInfo}>
          <Image source={itemImg} style={styles.productImage} />
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

        <Text style={styles.sectionTitle}>Notes</Text>
        <TextInput
          style={styles.input}
          placeholder="Tulis catatan di sini..."
          value={notes}
          onChangeText={setNotes}
          multiline={true}
        />
      </ScrollView>

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

        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart - {formatRupiah(itemPrice * qty)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}