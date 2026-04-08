import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../../(style)/rincian.styles';
import { CartItem, useCart } from '../../../context/cart-context';

const formatRupiah = (number: number) => {
  return "Rp " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const IMAGES: Record<string, any> = {
  latte: require('@/assets/images/latte.png'),
  americano: require('@/assets/images/americano.png'),
  caramel: require('@/assets/images/caramel.png'),
  dalgona: require('@/assets/images/Dalgona.png'),
  matcha: require('@/assets/images/Matcha.png'),
  cokelat: require('@/assets/images/cokelat.png'),
  lemon: require('@/assets/images/lemon.png'),
  strawberry: require('@/assets/images/strawberry_sprite.png'),
  mochi: require('@/assets/images/mochi.png'),
  croissant: require('@/assets/images/croissant.png'),
  pie: require('@/assets/images/pie.png'),
  redvelvet: require('@/assets/images/redvelvet.png'),
};

const DESSERTS = ['mochi', 'croissant', 'pie', 'cake'];
const COLD_ONLY = ['strawberry'];

const TEMP_OPTIONS = ['Hot', 'Cold'];
const SIZE_OPTIONS = ['Small', 'Reguler', 'Large'];
const SUGAR_OPTIONS = ['Normal', 'Less', 'No Sugar'];

const DESSERT_FLAVORS: Record<string, string[]> = {
  mochi: ['Matcha', 'Vanilla', 'Strawberry'],
  croissant: ['Chocolate', 'Cheese', 'Plain'],
  pie: ['Apple', 'Chocolate', 'Berry'],
  cake: ['Chocolate Cake', 'Red Velvet Cake', 'Cheese Cake'],
};

const OptionButton = ({ label, state, setState }: { label: string, state: string, setState: any }) => (
  <TouchableOpacity
    style={[styles.optionBtn, state === label && styles.optionBtnActive]}
    onPress={() => setState(label)}
  >
    <Text style={[styles.optionText, state === label && { color: '#FFF' }]}>{label}</Text>
  </TouchableOpacity>
);

export default function RincianScreen() {
  const { name, price, desc, imageKey, origin } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const activeKey = String(imageKey) === 'redvelvet' ? 'cake' : String(imageKey);
  
  const isDessert = DESSERTS.includes(activeKey);
  const isColdOnly = COLD_ONLY.includes(activeKey);

  const availableFlavors = isDessert && DESSERT_FLAVORS[activeKey] 
    ? DESSERT_FLAVORS[activeKey] 
    : ['Original'];

  // --- DEFAULT STATE ---
  const [temperature, setTemperature] = useState<string>(isColdOnly ? 'Cold' : 'Cold');
  const [size, setSize] = useState<string>('Reguler');
  const [sugar, setSugar] = useState<string>('Normal');
  const [flavor, setFlavor] = useState<string>(availableFlavors[0]); 
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');

  const itemName = name ? String(name) : 'Coffee Latte';
  const itemDesc = desc ? String(desc) : 'Espresso with steamed milk and a layer of foam.';
  const itemImg = IMAGES[activeKey] ? IMAGES[activeKey] : IMAGES['latte'];

  // ==========================================================
  // LOGIKA HARGA DINAMIS (Kecil -4000, Besar +4000)
  // ==========================================================
  const basePrice = useMemo(() => price ? Number(price) : 32000, [price]);
  
  const finalPrice = useMemo(() => {
    let currentPrice = basePrice;
    
    // Harga cuma berubah ukurannya kalau yang dipesan BUKAN dessert
    if (!isDessert) {
      if (size === 'Small') currentPrice -= 4000;
      if (size === 'Large') currentPrice += 4000;
    }
    
    return currentPrice;
  }, [basePrice, size, isDessert]);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      id: `${activeKey}-${Date.now()}`, 
      name: itemName,
      price: finalPrice, // <--- FIX: Pastikan yang dikirim ke keranjang itu harga final yang udah disesuaikan
      qty: qty,
      image: itemImg,
      temp: isDessert ? undefined : temperature,
      size: isDessert ? undefined : size,
      sugar: isDessert ? undefined : sugar,
      flavor: isDessert ? flavor : undefined, 
      desc: isDessert ? `Flavor: ${flavor}` : `${temperature}, ${size}, ${sugar}`,
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
    <View style={[styles.container, { flex: 1 }]}>
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
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scrollContent, { flexGrow: 1, paddingBottom: 150 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.productInfo}>
          <Image source={itemImg} style={styles.productImage} />
          <View style={styles.productDesc}>
            <Text style={styles.descText}>{itemDesc}</Text>
            {/* TAMPILAN HARGA YANG OTOMATIS BERUBAH */}
            <Text style={styles.priceText}>{formatRupiah(finalPrice)}</Text>
          </View>
        </View>

        {isDessert && (
          <>
            <Text style={styles.sectionTitle}>Flavor</Text>
            <View style={styles.row}>
              {availableFlavors.map((opt) => (
                <OptionButton key={opt} label={opt} state={flavor} setState={setFlavor} />
              ))}
            </View>
          </>
        )}

        {!isDessert && (
          <>
            {!isColdOnly && (
              <>
                <Text style={styles.sectionTitle}>Temperature</Text>
                <View style={styles.row}>
                  {TEMP_OPTIONS.map((opt) => (
                    <OptionButton key={opt} label={opt} state={temperature} setState={setTemperature} />
                  ))}
                </View>
              </>
            )}

            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.row}>
              {SIZE_OPTIONS.map((opt) => (
                <OptionButton key={opt} label={opt} state={size} setState={setSize} />
              ))}
            </View>

            <Text style={styles.sectionTitle}>Sugar Level</Text>
            <View style={styles.row}>
              {SUGAR_OPTIONS.map((opt) => (
                <OptionButton key={opt} label={opt} state={sugar} setState={setSugar} />
              ))}
            </View>
          </>
        )}

        <Text style={styles.sectionTitle}>Order Instruction</Text>
        <TextInput
          style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
          placeholder="Tulis instruksi pesanan di sini..."
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
          {/* HARGA TOMBOL ADD TO CART YANG JUGA IKUT BERUBAH * QTY */}
          <Text style={styles.addToCartText}>Add to Cart - {formatRupiah(finalPrice * qty)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}