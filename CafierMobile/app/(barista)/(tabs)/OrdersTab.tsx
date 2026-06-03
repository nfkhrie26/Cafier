import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, ActivityIndicator, ScrollView } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import api, { IMAGE_BASE_URL } from '@/service/utils'; 

export default function OrdersTab() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);

  // 🚨 Dikasih mode isBackground biar layarnya ga kedip-kedip pas auto-refresh
  const fetchData = async (isBackground = false) => {
    if (!isBackground) setIsLoading(true);
    try {
      const response = await api.get('/barista/orders');
      setOrders(response.data.data);
    } catch (e) {
      console.error("Gagal tarik data pesanan:", e);
    } finally {
      if (!isBackground) setIsLoading(false);
    }
  };

  useEffect(() => {
    // 1. Tarik data pas pertama kali buka tab
    fetchData();

    // 2. Alarm auto-refresh tiap 5 detik (Biar orderan baru otomatis masuk pas lunas)
    const interval = setInterval(() => {
      fetchData(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleChangeStatus = async (orderId: string, newStatus: string) => {
    setSelectedOrder(null); 
    setOrders(prevOrders => prevOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));

    try {
      await api.put(`/barista/orders/${orderId}`, {
        status: newStatus
      });
    } catch (error) {
      console.error("Gagal update status pesanan:", error);
      alert("Gagal nyimpen status ke database!");
      fetchData(); 
    }
  };

  // 🚨 SATPAM PENYARING: Sembunyiin semua orderan yang statusnya masih 'pending'
  const activeOrders = orders.filter((order) => {
    const s = (order.status || '').toLowerCase();
    return s !== 'pending'; 
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <ActivityIndicator size="large" color="#422918" />
        <Text style={{ marginTop: 10, color: '#422918' }}>Narik data pesanan...</Text>
      </View>
    );
  }

  // 🚨 Ngeceknya ke activeOrders sekarang, bukan ke orders mentah
  if (!activeOrders || activeOrders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <Text style={{ fontSize: 16, color: '#7f8c8d' }}>Belum ada pesanan yang udah dibayar nih bro.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.gridContainer}>
        {activeOrders.map((order) => {
          const statusLower = (order.status || '').toLowerCase();
          let cardStatusColor = '#FDCB2C'; // Default kuning (Processed)
          if (statusLower === 'pickup') cardStatusColor = '#3498DB'; // Biru (Pick Up)
          if (statusLower === 'completed') cardStatusColor = '#2ecc71'; // Hijau (Completed)

          return (
            <TouchableOpacity key={order.id} style={styles.orderCard} activeOpacity={0.7} onPress={() => setSelectedOrder(order)}>
              <View style={styles.orderCardHeader}>
                <Text style={styles.orderNumber}>Order No {order.id}</Text>
                <Text style={styles.orderDate}>{order.date}{'\n'}{order.time}</Text>
              </View>
              
              {order.items && order.items.map((item: any) => (
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
                    
                    {item.variantDetails && item.variantDetails.map((variant: any, idx: number) => (
                      <View key={idx} style={{ flexDirection: 'row', marginTop: 2 }}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#4A3728' }}>{variant.title}: </Text>
                        <Text style={{ fontSize: 12, color: '#7f8c8d' }}>{variant.name}</Text>
                      </View>
                    ))}

                    {(item.notes || item.desc) ? <Text style={[styles.itemDesc, { marginTop: 4, fontStyle: 'italic' }]}>Notes: {item.notes || item.desc}</Text> : null}
                  </View>
                  <Text style={styles.itemQty}>x{item.qty}</Text>
                </View>
              ))}
              
              <View style={[styles.statusButton, { backgroundColor: cardStatusColor }]}>
                <Text style={[styles.statusButtonText, { textTransform: 'capitalize' }]}>{order.status}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

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
                      
                      {item.variantDetails && item.variantDetails.map((variant: any, idx: number) => (
                        <View key={idx} style={{ flexDirection: 'row', marginTop: 2 }}>
                          <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#4A3728' }}>{variant.title}: </Text>
                          <Text style={{ fontSize: 12, color: '#7f8c8d' }}>{variant.name}</Text>
                        </View>
                      ))}

                      {(item.notes || item.desc) ? <Text style={[styles.itemDesc, { marginTop: 4, fontStyle: 'italic' }]}>Notes: {item.notes || item.desc}</Text> : null}
                    </View>
                    <Text style={styles.itemQty}>x{item.qty}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.modalTitle}>Change status</Text>
              
              <View style={styles.modalActions}>
                <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#FDCB2C' }]} onPress={() => handleChangeStatus(selectedOrder.id, 'processed')}>
                  <Text style={styles.modalBtnText}>Processed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#3498DB' }]} onPress={() => handleChangeStatus(selectedOrder.id, 'pickup')}>
                  <Text style={styles.modalBtnText}>Pick Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#2ecc71' }]} onPress={() => handleChangeStatus(selectedOrder.id, 'completed')}>
                  <Text style={styles.modalBtnText}>Completed</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.modalCloseArea} onPress={() => setSelectedOrder(null)} />
            </View>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 20, paddingBottom: 50 },
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
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  modalBtn: { flex: 1, paddingVertical: 15, borderRadius: 15, alignItems: 'center' },
  modalBtnText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' }, 
  modalCloseArea: { position: 'absolute', top: -1000, bottom: -1000, left: -1000, right: -1000, zIndex: -1 }
});