import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, ActivityIndicator } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import api, { IMAGE_BASE_URL } from '@/service/utils';

export default function OrdersTab() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null); 
  const [isLoading, setIsLoading] = useState(true);
  // 🚨 KASIH NILAI AWAL ARRAY KOSONG [] BIAR GAK UNDEFINED
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/barista/orders');
        // Pastiin response.data.data ini beneran isinya array pesanan dari Laravel lu
        setOrders(response.data.data);
      } catch (e) {
        console.error("Gagal tarik data Cafier:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChangeStatus = (orderId: string, newStatus: string) => {
    setOrders(prevOrders => prevOrders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    setSelectedOrder(null); 
  }; // 🚨 INI DIA TUTUP KURUNG YANG ILANG KEMAREN!

  // 🚨 CEGAT PAKE LOADING BIAR GAK NGE-MAP DATA KOSONG
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <ActivityIndicator size="large" color="#422918" />
        <Text style={{ marginTop: 10, color: '#422918' }}>Narikh data pesanan...</Text>
      </View>
    );
  }

  // Kalo data kosong dari sananya (ga ada pesanan)
  if (!orders || orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <Text style={{ fontSize: 16, color: '#7f8c8d' }}>Belum ada pesanan masuk nih bro.</Text>
      </View>
    );
  }

  return (
    <View style={styles.gridContainer}>
      {orders.map((order) => (
        <TouchableOpacity key={order.id} style={styles.orderCard} activeOpacity={0.7} onPress={() => setSelectedOrder(order)}>
          <View style={styles.orderCardHeader}>
            <Text style={styles.orderNumber}>Order No {order.id}</Text>
            {/* Hati-hati: pastiin order.date & order.time beneran ada di json dari Laravel lu */}
            <Text style={styles.orderDate}>{order.date}{'\n'}{order.time}</Text>
          </View>
          
          {/* Hati-hati: pastiin order.items ini berbentuk array di json dari Laravel lu */}
          {order.items && order.items.map((item: any) => (
            <View key={item.id} style={styles.orderItemRow}>
              
              <View style={styles.itemImagePlaceholder}>
                {item.image ? (
                   // Pake URL gambar lu kalo emang dari API ngirim nama file
                   <Image source={{ uri: `${IMAGE_BASE_URL}${item.image}` }} style={styles.itemImage} />
                ) : (
                   <Ionicons name="cafe" size={24} color="#A08069" />
                )}
              </View>

              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>
              </View>
              <Text style={styles.itemQty}>x{item.qty}</Text>
            </View>
          ))}
          
          <View style={[styles.statusButton, { backgroundColor: order.status === 'Completed' ? '#2ecc71' : '#FDCB2C' }]}>
            <Text style={styles.statusButtonText}>{order.status}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* MODAL GANTI STATUS */}
      <Modal animationType="fade" transparent={true} visible={selectedOrder !== null} onRequestClose={() => setSelectedOrder(null)}>
        <View style={styles.modalOverlay}>
          {selectedOrder && (
            <View style={styles.modalContent}>
              <View style={styles.orderCardHeader}>
                <Text style={styles.orderNumber}>Order No {selectedOrder.id}</Text>
                <Text style={styles.orderDate}>{selectedOrder.date}{'\n'}{selectedOrder.time}</Text>
              </View>
              <View style={{ marginVertical: 20 }}>
                {selectedOrder.items && selectedOrder.items.map((item: any) => (
                  <View key={item.id} style={styles.orderItemRow}>
                    
                    <View style={styles.itemImagePlaceholder}>
                      {item.image ? (
                        <Image source={{ uri: `${IMAGE_BASE_URL}${item.image}` }} style={styles.itemImage} />
                      ) : (
                        <Ionicons name="cafe" size={24} color="#A08069" />
                      )}
                    </View>

                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemDesc}>{item.desc}</Text>
                    </View>
                    <Text style={styles.itemQty}>x{item.qty}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.modalTitle}>Change status</Text>
              <View style={styles.modalActions}>
                <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#FDCB2C' }]} onPress={() => handleChangeStatus(selectedOrder.id, 'Processed')}>
                  <Text style={styles.modalBtnText}>Processed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#2ecc71' }]} onPress={() => handleChangeStatus(selectedOrder.id, 'Completed')}>
                  <Text style={styles.modalBtnText}>Completed</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.modalCloseArea} onPress={() => setSelectedOrder(null)} />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

// ... (STYLING LU TETEP SAMA KAYAK SEBELUMNYA, GA ADA YANG GUA UBAH)
const styles = StyleSheet.create({
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 30, width: '100%' },
  orderCard: { backgroundColor: '#FDF8E4', borderRadius: 20, padding: 25, width: 350, elevation: 3 },
  orderCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  orderNumber: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  orderDate: { fontSize: 12, color: '#333', textAlign: 'right' },
  orderItemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  itemImagePlaceholder: { width: 50, height: 50, backgroundColor: '#EAE0D1', borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginRight: 15, overflow: 'hidden' },
  itemImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#4A3728' },
  itemDesc: { fontSize: 12, color: '#7f8c8d', marginTop: 2 },
  itemQty: { fontSize: 18, fontWeight: 'bold', color: '#4A3728', marginLeft: 10 },
  statusButton: { marginTop: 15, paddingVertical: 12, borderRadius: 25, alignItems: 'center' },
  statusButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#FDF8E4', width: 450, borderRadius: 20, padding: 30, elevation: 10 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 25 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 15 },
  modalBtn: { flex: 1, paddingVertical: 15, borderRadius: 30, alignItems: 'center' },
  modalBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  modalCloseArea: { position: 'absolute', top: -1000, bottom: -1000, left: -1000, right: -1000, zIndex: -1 }
});