import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { styles } from '../(style)/checkout.styles';
import { useCart } from '../../context/cart-context';
import api from '../../service/utils';

const formatRupiah = (number: number) => {
  return "Rp " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function CheckoutScreen() {
  const router = useRouter();
  
  const { 
    cartItems, 
    updateQty, 
    subtotal, 
    discountAmount, 
    totalPrice, 
    selectedVoucher, 
    removeVoucher 
  } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [loading, setLoading] = useState(false);
  const [snapToken, setSnapToken] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const tax = subtotal * 0.11;
  const grandTotal = subtotal + tax - discountAmount;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    try {
      const payload = {
        total_amount: grandTotal,
        items: cartItems, 
        voucher_id: selectedVoucher?.id
      };
      const response = await api.post('/checkout', payload);
      setSnapToken(response.data.snap_token);
      setShowPayment(true); 
    } catch (error: any) {
      Alert.alert('Error', 'Gagal memproses checkout.');
    } finally {
      setLoading(false);
    }
  };

  const onNavigationStateChange = (navState: any) => {
    const url = navState.url;
    if (url.includes('cafier-app.com')) { 
      setShowPayment(false);
      if (url.includes('transaction_status=settlement') || url.includes('transaction_status=capture')) {
        Alert.alert('Lunas', 'Pembayaran berhasil, pesanan sedang diproses.');
        router.replace('/homepages'); 
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="cart-outline" size={80} color="#C87A3F" />
          <Text style={styles.emptyStateTitle}>Belum ada pesanan</Text>
          <TouchableOpacity style={styles.emptyStateBtn} onPress={() => router.push('/menu')}>
            <Text style={styles.emptyStateBtnText}>Lihat Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.sectionTitle}>Pesanan Kamu</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.itemImage} />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemNameText}>{item.name}</Text>
                
                {/* FIX: Rincian spesifik dikembalikan ke bawah sini */}
                {item.isDessert ? (
                  <Text style={styles.detailText}>Flavor : {item.flavor}</Text>
                ) : (
                  <>
                    <Text style={styles.detailText}>Temperature : {item.temp}</Text>
                    <Text style={styles.detailText}>Size : {item.size}</Text>
                    <Text style={styles.detailText}>Sugar : {item.sugar}</Text>
                  </>
                )}
                {/* Tampilkan Notes kalau diisi */}
                {item.notes ? <Text style={[styles.detailText, { fontStyle: 'italic', marginTop: 4 }]}>Notes : {item.notes}</Text> : null}

                <Text style={styles.itemPrice}>{formatRupiah(item.price * item.qty)}</Text>
                
                <View style={styles.qtyContainer}>
                  <TouchableOpacity onPress={() => updateQty(item.id, 'minus')}>
                    <Ionicons name="remove-circle-outline" size={24} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.qty}</Text>
                  <TouchableOpacity onPress={() => updateQty(item.id, 'plus')}>
                    <Ionicons name="add-circle-outline" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Voucher Diskon</Text>
          <TouchableOpacity 
            style={[styles.voucherRow, selectedVoucher && { borderColor: '#C87A3F', borderWidth: 1 }]} 
            onPress={() => router.push('/vouchers')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.voucherIconBg, selectedVoucher && { backgroundColor: '#F0E2D3' }]}>
                <Ionicons name="pricetag" size={20} color="#C87A3F" />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.voucherStatusText, selectedVoucher && { color: '#C87A3F' }]}>
                  {selectedVoucher ? '1 voucher berhasil dipakai' : 'Pakai voucher diskon'}
                </Text>
                {selectedVoucher && discountAmount > 0 && (
                  <Text style={[styles.discountDetailText, { color: '#C87A3F' }]}>
                    Dapat diskon {formatRupiah(discountAmount)} 🎉
                  </Text>
                )}
              </View>
            </View>
            
            {selectedVoucher ? (
              <TouchableOpacity onPress={removeVoucher}>
                <Ionicons name="close-circle" size={22} color="#888" />
              </TouchableOpacity>
            ) : (
              <Ionicons name="chevron-forward" size={20} color="#888" />
            )}
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
          <View style={styles.paymentBox}>
            <TouchableOpacity style={styles.paymentOption} onPress={() => setPaymentMethod('qris')}>
              <Text style={styles.logoText}>QRIS</Text> 
              <Ionicons name={paymentMethod === 'qris' ? "radio-button-on" : "radio-button-off"} size={22} color="#4A3525" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption} onPress={() => setPaymentMethod('mastercard')}>
              <Text style={styles.logoText}>Mastercard</Text>
              <Ionicons name={paymentMethod === 'mastercard' ? "radio-button-on" : "radio-button-off"} size={22} color="#4A3525" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Rincian Pembayaran</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatRupiah(subtotal)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Pajak (11%)</Text>
              <Text style={styles.summaryValue}>{formatRupiah(tax)}</Text>
            </View>

            {selectedVoucher && discountAmount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: '#C87A3F' }]}>Promo ({selectedVoucher.title})</Text>
                <Text style={[styles.summaryValue, { color: '#C87A3F' }]}>-{formatRupiah(discountAmount)}</Text>
              </View>
            )}
            
            <View style={[styles.summaryRow, styles.totalBorder]}>
              <Text style={styles.grandTotalLabel}>Total Pembayaran</Text>
              <Text style={styles.grandTotalValue}>{formatRupiah(grandTotal)}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.placeOrderBtn}
            disabled={loading}
            onPress={handleCheckout}
          >
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.placeOrderText}>Pesan Sekarang</Text>}
          </TouchableOpacity>
        </ScrollView>
      )}

      <Modal visible={showPayment} animationType="slide">
        <WebView
          source={{ uri: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}` }}
          onNavigationStateChange={onNavigationStateChange}
          startInLoadingState={true}
        />
        <TouchableOpacity style={{ padding: 20, backgroundColor: '#4A3525', alignItems: 'center' }} onPress={() => setShowPayment(false)}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Kembali</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}