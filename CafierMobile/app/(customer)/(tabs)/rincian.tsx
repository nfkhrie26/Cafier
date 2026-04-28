import { IMAGE_BASE_URL } from '@/service/utils';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../(style)/rincian.styles';
import { CartItem, useCart } from '../../../context/cart-context';

const formatRupiah = (number: number) => {
  return "Rp " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const OptionButton = ({ 
  label, 
  extraPrice, 
  isSelected, 
  onPress 
}: { 
  label: string, 
  extraPrice: number, 
  isSelected: boolean, 
  onPress: () => void 
}) => (
  <TouchableOpacity
    style={[styles.optionBtn, isSelected && styles.optionBtnActive]}
    onPress={onPress}
  >
    <Text style={[styles.optionText, isSelected && { color: '#FFF' }]}>
      {label} {extraPrice > 0 ? `(+${extraPrice / 1000}k)` : ''}
    </Text>
  </TouchableOpacity>
);

export default function RincianScreen() {
  const { id, name, price, desc, imageUrl, variants, origin } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  // 1. SIAPIN DATA MENTAH DARI PARAMS
  const itemId = String(id);
  const itemName = name ? String(name) : 'Menu Item';
  const itemDesc = desc ? String(desc) : 'Deskripsi tidak tersedia.';
  const itemImgUri = `${IMAGE_BASE_URL}${imageUrl}`;
  const hargaAsli = useMemo(() => price ? Number(price) : 0, [price]);
  
  // 🚨 BUKA BUNGKUSAN VARIANTS DARI ProductList
  const parsedVariants = useMemo(() => {
    try {
      return variants ? JSON.parse(String(variants)) : [];
    } catch (e) {
      console.error("Gagal parse variants:", e);
      return [];
    }
  }, [variants]);

  // 2. STATE DINAMIS & CATATAN
  const [selections, setSelections] = useState<Record<string, any>>({});
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');

  // 🚨 BIKIN DEFAULT PILIHAN: Pas buka halaman, opsi pertama otomatis kepilih
  useEffect(() => {
    if (parsedVariants && parsedVariants.length > 0) {
      const initialSelections: Record<string, any> = {};
      parsedVariants.forEach((variants: any) => {
        if (variants.options && variants.options.length > 0) {
          initialSelections[variants.title] = variants.options[0];
        }
      });
      setSelections(initialSelections);
    }
  }, [parsedVariants]);

  // Fungsi buat ngubah pilihan user
  const handleSelectOption = (variantTitle: string, option: any) => {
    setSelections(prev => ({
      ...prev,
      [variantTitle]: option 
    }));
  };

  // 3. NGITUNG HARGA FINAL BERDASARKAN PILIHAN
  const finalPrice = useMemo(() => {
    let totalExtra = 0;
    Object.values(selections).forEach((opt: any) => {
      totalExtra += opt.extra_price || 0;
    });
    return hargaAsli + totalExtra;
  }, [hargaAsli, selections]);

  // 4. MASUKIN KE KERANJANG
  const handleAddToCart = () => {
    // 1. Bikin teks gabungan varian (Misal: "Temperature: Ice, Size: Large")
    const variantDetailsArray = Object.entries(selections).map(([title, opt]) => ({
      title: title,
      name: opt.name
    }));
    
    const stringVarianUnik = variantDetailsArray.map(v => `${v.title}:${v.name}`).join('|');
    const uniqueCartId = `${itemId}-${stringVarianUnik}-${notes}`;

    // 3. Objek yang dikirim murni dinamis!
    const newItem: CartItem = {
      cartItemId: uniqueCartId, 
      id: itemId,
      name: itemName,
      price: finalPrice, 
      qty: qty,
      image: itemImgUri, 
      variantDetails: variantDetailsArray,
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
          <Image source={{ uri: itemImgUri }} style={styles.productImage} />
          <View style={styles.productDesc}>
            <Text style={styles.descText}>{itemDesc}</Text>
            <Text style={styles.priceText}>{formatRupiah(finalPrice)}</Text>
          </View>
        </View>

        {parsedVariants.map((variants: any, index: number) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>{variants.title}</Text>
            <View style={styles.row}>
              {variants.options.map((opt: any) => {
                const isSelected = selections[variants.title]?.name === opt.name;
                return (
                  <OptionButton 
                    key={opt.name} 
                    label={opt.name} 
                    extraPrice={opt.extra_price}
                    isSelected={isSelected} 
                    onPress={() => handleSelectOption(variants.title, opt)} 
                  />
                );
              })}
            </View>
          </View>
        ))}

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
          <Text style={styles.addToCartText}>Add to Cart - {formatRupiah(finalPrice * qty)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}