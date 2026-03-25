import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useCart } from '../../context/cart-context';
import api from '../../service/utils';
// Impor style dari file terpisah
import { styles } from '../(style)/checkout.styles';

const formatRupiah = (number: number) => {
  return "Rp. " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function CheckoutScreen() {
  const router = useRouter();
  
  const { cartItems, updateQty, totalPrice } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [loading, setLoading] = useState(false);
  const [snapToken, setSnapToken] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const tax = totalPrice * 0.11;
  const grandTotal = totalPrice + tax;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    setLoading(true);
    try {
      const payload = {
        total_amount: grandTotal,
        items: cartItems, 
      };

      const response = await api.post('/checkout', payload);
      
      setSnapToken(response.data.snap_token);
      setShowPayment(true); 

    } catch (error: any) {
      console.log("ERROR DATA:", error.response?.data);
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
      } else if (url.includes('transaction_status=pending')) {
        Alert.alert('Pending', 'Segera selesaikan pembayaran.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="cart-outline" size={80} color="#C87A3F" />
          <Text style={styles.emptyStateTitle}>Belum ada pesanan</Text>
          <Text style={styles.emptyStateDesc}>Keranjang kamu masih kosong. Yuk, tambahkan menu favoritmu sekarang.</Text>
          <TouchableOpacity style={styles.emptyStateBtn} onPress={() => router.push('/menu')}>
            <Text style={styles.emptyStateBtnText}>Lihat Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.imageContainer}>
                <Text style={styles.imageTitle}>{item.name}</Text>
                <Image source={item.image} style={styles.itemImage} />
              </View>
              
              <View style={styles.itemDetails}>
                {item.isDessert ? (
                  <>
                    <Text style={styles.detailText}>{item.desc}</Text>
                    {item.notes ? <Text style={styles.detailText}>Notes : {item.notes}</Text> : null}
                  </>
                ) : (
                  <>
                    <Text style={styles.detailText}>Temperature : {item.temp}</Text>
                    <Text style={styles.detailText}>Size : {item.size}</Text>
                    <Text style={styles.detailText}>Sugar : {item.sugar}</Text>
                    {item.notes ? <Text style={styles.detailText}>Notes : {item.notes}</Text> : null}
                  </>
                )}
                
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

          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <TouchableOpacity style={styles.paymentOption} onPress={() => setPaymentMethod('qris')}>
            <Text style={styles.logoText}>QRIS</Text> 
            <Ionicons 
              name={paymentMethod === 'qris' ? "radio-button-on" : "radio-button-off"} 
              size={24} 
              color={paymentMethod === 'qris' ? "#33241C" : "#888"} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentOption} onPress={() => setPaymentMethod('mastercard')}>
            <Text style={styles.logoText}>Mastercard</Text>
            <Ionicons 
              name={paymentMethod === 'mastercard' ? "radio-button-on" : "radio-button-off"} 
              size={24} 
              color={paymentMethod === 'mastercard' ? "#33241C" : "#888"} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.voucherButton} 
            onPress={() => router.push('/vouchers')}
          >
            <Text style={styles.voucherText}>Use Vouchers</Text>
            <Ionicons name="chevron-forward" size={20} color="#000" />
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total (inc. Tax):</Text>
              <Text style={styles.totalValue}>{formatRupiah(grandTotal)}</Text>
            </View>

            <TouchableOpacity 
              style={styles.placeOrderBtn}
              disabled={loading}
              onPress={handleCheckout}
            >
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.placeOrderText}>Place Order</Text>}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <Modal visible={showPayment} animationType="slide" transparent={false}>
        <WebView
          source={{ uri: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}` }}
          onNavigationStateChange={onNavigationStateChange}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator 
              size="large" 
              color="#C27A32" 
              style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: -20 }} 
            />
          )}
        />
        <TouchableOpacity 
          style={{ padding: 15, backgroundColor: '#4A3525', alignItems: 'center' }} 
          onPress={() => setShowPayment(false)}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Tutup</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}