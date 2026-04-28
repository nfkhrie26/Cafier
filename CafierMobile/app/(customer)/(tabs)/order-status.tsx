import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform, StatusBar, ActivityIndicator } from 'react-native';
import api, { IMAGE_BASE_URL } from '@/service/utils'; 

export default function OrderStatusScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 
  
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const statusSteps = ['Order\nConfirmed', 'Payment', 'Processed', 'Pickup'];

  useEffect(() => {
    if (id) {
      fetchOrderDetails();
    } else {
      setLoading(false); 
    }
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await api.get(`/orders/${id}`); 
      const dataAsli = response.data.data || response.data;
      setOrderData(dataAsli); 
    } catch (error) {
      console.error("Gagal ambil data order:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndex = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'ready' || s === 'completed' || s === 'pickup') return 3;
    if (s === 'processing' || s === 'processed' || s === 'diproses') return 2;
    if (s === 'paid' || s === 'lunas' || s === 'payment_success') return 1;
    return 0; 
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#C07C33" />
        <Text style={{ marginTop: 10, color: '#422A1E' }}>Memuat pesananmu...</Text>
      </View>
    );
  }

  if (!orderData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ marginBottom: 20 }}>Pesanan tidak ditemukan.</Text>
        <TouchableOpacity style={styles.homeBtn} onPress={() => router.push('../profile')}>
          <Text style={styles.homeBtnText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentStatusIndex = getStatusIndex(orderData.status);
  const progressWidth = (currentStatusIndex / (statusSteps.length - 1)) * 100;

  const orderDate = orderData.created_at ? new Date(orderData.created_at).toLocaleDateString('id-ID') : '-';
  const orderTime = orderData.created_at ? new Date(orderData.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-';

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome Back Ada</Text>
          <Text style={styles.email}>Adawong@gmail.com</Text>
        </View>
        <Image
          source={require("@/assets/images/adawong.jpg")}
          style={styles.avatar}
        />
      </View>

      <ScrollView 
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.logoContainer, { height: 100, justifyContent: 'center', marginTop: 10, marginBottom: 20 }]}>
          <Image 
            source={require('@/assets/images/serene-logo-cokelat.png')} 
            style={{ width: 250, height: 250, resizeMode: 'contain' }} 
          />
        </View>

        <View style={styles.orderCard}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.orderNoText} numberOfLines={1}>
                No {orderData.invoice_number || orderData.id}
              </Text> 
            </View>
            <View style={{ alignItems: 'flex-end', marginLeft: 10 }}>
              <Text style={styles.dateText}>{orderDate}</Text>
              <Text style={styles.timeText}>{orderTime}</Text>
            </View>
          </View>

          <View style={styles.timelineWrapper}>
            <View style={styles.baseLine} />
            <View style={[styles.activeLine, { width: `${progressWidth}%` }]} />

            <View style={styles.stepsContainer}>
              {statusSteps.map((step, index) => {
                const isDone = index <= currentStatusIndex;
                return (
                  <View key={index} style={styles.stepItem}>
                    <View style={[styles.circle, isDone && styles.circleActive]} />
                    <Text style={[styles.stepLabel, isDone && styles.stepLabelActive]}>
                      {step}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          <Text style={styles.orderTitle}>Order</Text>
          <View style={styles.itemsList}>
            {orderData.items && orderData.items.map((item: any, index: number) => {
              
              // 🚨 LOGIKA BARU ANTI DOBEL URL
              let imagePath = item.product?.image || item.image || '';
              let finalImageUrl = '';

              if (imagePath.startsWith('http')) {
                // Kalau Fakhrie ngasih udah full url (https://...), langsung pake
                finalImageUrl = imagePath;
              } else {
                // Kalau cuma path doang (/products/coffee.png), gabungin sama Base URL
                if (imagePath && !imagePath.startsWith('/')) {
                  imagePath = '/' + imagePath;
                }
                finalImageUrl = `${IMAGE_BASE_URL}${imagePath}`;
              }
              
              console.log(`URL Fix item ke-${index}:`, finalImageUrl);

              return (
                <View key={index} style={styles.itemRow}>
                  {finalImageUrl ? (
                     <Image 
                       source={{ uri: finalImageUrl }} 
                       style={styles.itemImage} 
                     />
                  ) : (
                    <View style={[styles.itemImage, { backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center' }]}>
                       <Ionicons name="image-outline" size={24} color="#999" />
                    </View>
                  )}
                  
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.product?.name || item.name}</Text>
                    <Text style={styles.itemDesc}>
                      {item.notes || 'Normal'} 
                    </Text>
                  </View>
                  <Text style={styles.itemQty}>{item.quantity || item.qty}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <TouchableOpacity style={styles.homeBtn} onPress={() => router.push('../profile')}>
          <Text style={styles.homeBtnText}>Back to Profile</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EDE3D3' },
  header: {
    backgroundColor: "#422A1E",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 20 : 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
    elevation: 5,
  },
  welcome: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  email: { color: "#fff", opacity: 0.8, fontSize: 13 },
  avatar: { width: 45, height: 45, borderRadius: 25 },
  scrollArea: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 150, paddingTop: 10 },
  logoContainer: { alignItems: "center", justifyContent: "center" },
  orderCard: {
    backgroundColor: '#F7EDD5',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 20,
    paddingTop: 30,
    elevation: 4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  orderNoText: { fontSize: 16, fontWeight: 'bold', color: '#33241C' },
  dateText: { fontSize: 12, color: '#666' },
  timeText: { fontSize: 12, color: '#666' },
  timelineWrapper: { height: 100, marginVertical: 10, position: 'relative' },
  baseLine: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#FFF',
    left: '12.5%', 
    right: '12.5%', 
    top: 17,
    borderRadius: 2,
  },
  activeLine: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#C07C33',
    left: '12.5%',
    top: 17,
    borderRadius: 2,
  },
  stepsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  stepItem: { width: '25%', alignItems: 'center' },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#C07C33',
    zIndex: 10, 
  },
  circleActive: { backgroundColor: '#C07C33' },
  stepLabel: { fontSize: 9, color: '#999', textAlign: 'center', marginTop: 10, fontWeight: '600' },
  stepLabelActive: { color: '#33241C', fontWeight: 'bold' },
  orderTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  itemsList: { gap: 12 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
  },
  itemImage: { width: 50, height: 50, resizeMode: 'cover', borderRadius: 8 }, 
  itemInfo: { flex: 1, marginLeft: 12 },
  itemName: { fontSize: 14, fontWeight: 'bold', color: '#33241C' },
  itemDesc: { fontSize: 11, color: '#666' },
  itemQty: { fontSize: 16, fontWeight: 'bold', color: '#33241C' },
  homeBtn: {
    backgroundColor: '#C07C33',
    marginHorizontal: 30,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 35,
  },
  homeBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});