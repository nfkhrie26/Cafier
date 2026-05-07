import React, { useCallback, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack, useFocusEffect, useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons';
import api, { IMAGE_BASE_URL } from '@/service/utils';
import MainHeader from '@/components/main-header'; 

export default function OrderHistory() {
  const router = useRouter();

  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchHistory = async () => {
        setLoading(true);
        try {
          const response = await api.get('/history');
          if (isActive) {
            const dataAsli = response.data.data || [];
            setHistoryData(dataAsli);
          }
        } catch (error) {
          console.error("Gagal load history:", error);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchHistory();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'batal' || s === 'cancel') return '#E74C3C'; 
    if (s === 'pending') return '#F39C12'; 
    if (s === 'diproses' || s === 'processing') return '#3498DB'; 
    if (s === 'lunas' || s === 'completed' || s === 'ready' || s === 'selesai' || s === 'pickup') return '#2ECC71'; 
    return '#95A5A6'; 
  };

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

        {loading ? (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
             <ActivityIndicator size="large" color="#422A1E" />
             <Text style={{ marginTop: 10, color: '#422A1E', fontWeight: 'bold' }}>Memuat riwayat...</Text>
          </View>
        ) : historyData.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Ionicons name="receipt-outline" size={60} color="#999" />
            <Text style={{ marginTop: 10, color: '#666', fontSize: 16 }}>Belum ada riwayat pesanan.</Text>
          </View>
        ) : (
          historyData.map((order: any) => {
            const orderDate = order.created_at ? new Date(order.created_at).toLocaleDateString('id-ID') : '-';
            const orderTime = order.created_at ? new Date(order.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-';

            return (
              <View key={order._id || order.id} style={styles.orderCard}>
                
                <View style={styles.orderCardHeader}>
                  <Text style={styles.orderNo} numberOfLines={1}>No {order.invoice_number || order.id}</Text>
                  <Text style={styles.orderDate}>{orderDate}{"\n"}{orderTime}</Text>
                </View>

                <Text style={styles.orderLabel}>Order</Text>

                {order.items && order.items.map((item: any, index: number) => {
                  
                  // 🚨 DETEKSI NAMA: Biar tau ini Americano atau bukan
                  const itemName = item.product?.name || item.name || '';
                  const isAmericano = itemName.toLowerCase().includes('americano');

                  let imagePath = item.product?.image || item.image;
                  let finalImageUrl = '';

                  if (imagePath && typeof imagePath === 'string') {
                    if (imagePath.startsWith('http')) {
                      finalImageUrl = imagePath;
                    } else {
                      if (!imagePath.startsWith('/')) {
                        imagePath = '/' + imagePath;
                      }
                      finalImageUrl = `${IMAGE_BASE_URL}${imagePath}`;
                    }
                  }

                  return (
                    <View key={index} style={styles.itemRow}>
                      
                      {/* 🚨 TRIK FOTO LOKAL BERAKSI DI SINI */}
                      {isAmericano ? (
                        <Image source={require('@/assets/images/americano.png')} style={styles.itemImage} />
                      ) : finalImageUrl && finalImageUrl !== IMAGE_BASE_URL + '/' ? (
                        <Image source={{ uri: finalImageUrl }} style={styles.itemImage} />
                      ) : (
                        <View style={[styles.itemImage, { backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center' }]}>
                          <Ionicons name="image-outline" size={20} color="#999" />
                        </View>
                      )}
                      
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{itemName}</Text>
                        <Text style={styles.itemDesc}>{item.notes || 'Normal'}</Text>
                      </View>
                      <Text style={styles.itemQty}>{item.quantity || item.qty}x</Text>
                    </View>
                  );
                })}

                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                  <Text style={styles.statusText}>{order.status?.toUpperCase() || 'UNKNOWN'}</Text>
                </View>
              </View>
            );
          })
        )}

        <TouchableOpacity 
          style={styles.btnBack} 
          onPress={() => router.push('../profile')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnBackText}>Back to Profile</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5D9C6',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 150, 
  },
  logoContainer: { 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  orderCard: {
    backgroundColor: '#FFF9EF', 
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 25,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  orderCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  orderNo: { fontSize: 16, fontWeight: 'bold', color: '#33241C', flex: 1 },
  orderDate: { fontSize: 12, color: '#888', textAlign: 'right', marginLeft: 10 },
  orderLabel: { fontSize: 18, fontWeight: 'bold', color: '#33241C', textAlign: 'center', marginVertical: 15 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  itemImage: { width: 55, height: 55, borderRadius: 27.5 },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemName: { fontSize: 15, fontWeight: 'bold', color: '#603813', marginBottom: 2 },
  itemDesc: { fontSize: 11, color: '#999' },
  itemQty: { fontSize: 18, fontWeight: 'bold', color: '#33241C', marginRight: 10 },
  statusBadge: {
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  statusText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  btnBack: {
    backgroundColor: '#C97C3A',
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
  },
  btnBackText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
});