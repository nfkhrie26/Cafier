import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import api, { IMAGE_BASE_URL } from '@/service/utils'; 
import MainHeader from '@/components/main-header';

export default function OrderStatusScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 
  
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const statusSteps = ['Order\nConfirmed', 'Payment', 'Processed', 'Pickup'];

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      if (id) {
        const response = await api.get(`/orders/${id}`); 
        setOrderData(response.data.data || response.data); 
      } else {
        const response = await api.get('/orders');
        const allOrders = response.data.data || response.data;

        if (allOrders && allOrders.length > 0) {
          const activeOrder = allOrders.find((o: any) => {
            const s = o.status?.toLowerCase();
            return s !== 'completed' && s !== 'pickup' && s !== 'selesai' && s !== 'ready';
          });

          setOrderData(activeOrder || null);
        } else {
          setOrderData(null);
        }
      }
    } catch (error) {
      console.error("Gagal ambil data order:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndex = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'ready' || s === 'completed' || s === 'pickup' || s === 'selesai') return 3;
    if (s === 'processing' || s === 'processed' || s === 'diproses') return 2;
    if (s === 'paid' || s === 'lunas' || s === 'payment_success') return 1;
    return 0; 
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#C07C33" />
        <Text style={{ marginTop: 10, color: '#422A1E', fontWeight: 'bold' }}>Memuat pesananmu...</Text>
      </View>
    );
  }

  if (!orderData) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <MainHeader />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="receipt-outline" size={80} color="#C07C33" style={{ marginBottom: 15 }} />
          <Text style={{ marginBottom: 20, fontSize: 16, color: '#5A3E2B' }}>Belum ada pesanan aktif saat ini.</Text>
          <TouchableOpacity style={[styles.homeBtn, { width: 200 }]} onPress={() => router.push('../homepages')}>
            <Text style={styles.homeBtnText}>Pesan Sekarang</Text>
          </TouchableOpacity>
        </View>
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

      <MainHeader />

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
              
              const itemName = item.product?.name || item.name || '';
              // 🚨 DETEKSI: Apakah namanya ada unsur 'Americano'?
              const isAmericano = itemName.toLowerCase().includes('americano');

              let imagePath = item.product?.image || item.image || '';
              let finalImageUrl = '';

              if (imagePath.startsWith('http')) {
                finalImageUrl = imagePath;
              } else {
                if (imagePath && !imagePath.startsWith('/')) {
                  imagePath = '/' + imagePath;
                }
                finalImageUrl = `${IMAGE_BASE_URL}${imagePath}`;
              }

              return (
                <View key={index} style={styles.itemRow}>
                  {/* 🚨 TRIK RENDER GAMBAR */}
                  {isAmericano ? (
                    // Kalau itu Americano, paksa pakai foto lokal
                    <Image 
                      source={require('@/assets/images/americano.png')} 
                      style={styles.itemImage} 
                    />
                  ) : finalImageUrl && finalImageUrl !== IMAGE_BASE_URL + '/' ? (
                    // Kalau minuman lain yang ada gambarnya
                     <Image 
                       source={{ uri: finalImageUrl }} 
                       style={styles.itemImage} 
                     />
                  ) : (
                    // Kalau error/gak ada gambar sama sekali
                    <View style={[styles.itemImage, { backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center' }]}>
                       <Ionicons name="image-outline" size={24} color="#999" />
                    </View>
                  )}
                  
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{itemName}</Text>
                    <Text style={styles.itemDesc}>
                      {item.notes || 'Normal'} 
                    </Text>
                  </View>
                  <Text style={styles.itemQty}>{item.quantity || item.qty}x</Text>
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