import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native'; // <-- Tambahin import Image
import { Ionicons } from '@expo/vector-icons';

// 1. TAMBAHIN PROPERTI `image` DI SETIAP ITEM PESANAN
const INITIAL_ORDERS = [
  {
    id: '124', date: '12-10-2026', time: '10:00', status: 'Completed',
    items: [
      { id: 1, name: 'Hot Latte', desc: 'Size : normal  Sugar : normal', qty: 1, image: require('../assets/images/latte.png') },
      { id: 2, name: 'Iced Matcha', desc: 'Size : normal  Sugar : normal', qty: 1, image: require('../assets/images/Matcha.png') }, 
      { id: 3, name: 'Mochi', desc: 'Variant : Strawberry', qty: 1, image: require('../assets/images/mochi.png') }, 
    ]
  },
  {
    id: '125', date: '12-10-2026', time: '10:10', status: 'Completed',
    items: [
      { id: 1, name: 'Hot Latte', desc: 'Size : normal  Sugar : normal', qty: 1, image: require('../assets/images/latte.png') },
      { id: 2, name: 'Iced Matcha', desc: 'Size : normal  Sugar : normal', qty: 1, image: require('../assets/images/Matcha.png') },
      { id: 3, name: 'Mochi', desc: 'Variant : Strawberry', qty: 1, image: require('../assets/images/mochi.png') }, 
    ]
  },
  {
    id: '126', date: '12-10-2026', time: '10:15', status: 'Processed',
    items: [
      { id: 1, name: 'Hot Latte', desc: 'Size : normal  Sugar : normal', qty: 1, image: require('../assets/images/latte.png') },
      { id: 2, name: 'Iced Matcha', desc: 'Size : normal  Sugar : normal', qty: 1, image: require('../assets/images/Matcha.png') },
      { id: 3, name: 'Mochi', desc: 'Variant : Strawberry', qty: 1, image: require('../assets/images/mochi.png') }, 
    ]
  },
  {
    id: '127', date: '12-10-2026', time: '10:17', status: 'Processed',
    items: [
      { id: 1, name: 'Hot Latte', desc: 'Size : normal  Sugar : normal', qty: 1, image: require('../assets/images/latte.png') },
      { id: 2, name: 'Iced Matcha', desc: 'Size : normal  Sugar : normal', qty: 1, image: require('../assets/images/Matcha.png') },
    ]
  },
  {
    id: '128', date: '12-10-2026', time: '10:18', status: 'Processed',
    items: [
      { id: 1, name: 'Hot Latte', desc: 'Size : normal  Sugar : normal', qty: 1, image: require('../assets/images/latte.png') },
    ]
  },
];

export default function OrdersTab() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<any>(null); 

  const handleChangeStatus = (orderId: string, newStatus: string) => {
    setOrders(prevOrders => prevOrders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    setSelectedOrder(null); 
  };

  return (
    <View style={styles.gridContainer}>
      {orders.map((order) => (
        <TouchableOpacity key={order.id} style={styles.orderCard} activeOpacity={0.7} onPress={() => setSelectedOrder(order)}>
          <View style={styles.orderCardHeader}>
            <Text style={styles.orderNumber}>Order No {order.id}</Text>
            <Text style={styles.orderDate}>{order.date}{'\n'}{order.time}</Text>
          </View>
          {order.items.map((item) => (
            <View key={item.id} style={styles.orderItemRow}>
              
              {/* 2. GANTI BAGIAN SINI BIAR BISA NAMPILIN GAMBAR */}
              <View style={styles.itemImagePlaceholder}>
                {item.image ? (
                   <Image source={item.image} style={styles.itemImage} />
                ) : (
                   <Ionicons name="cafe" size={24} color="#A08069" />
                )}
              </View>

              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>
              </View>
              <Text style={styles.itemQty}>{item.qty}</Text>
            </View>
          ))}
          <View style={[styles.statusButton, { backgroundColor: order.status === 'Completed' ? '#2ecc71' : '#FDCB2C' }]}>
            <Text style={styles.statusButtonText}>{order.status}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Modal animationType="fade" transparent={true} visible={selectedOrder !== null} onRequestClose={() => setSelectedOrder(null)}>
        <View style={styles.modalOverlay}>
          {selectedOrder && (
            <View style={styles.modalContent}>
              <View style={styles.orderCardHeader}>
                <Text style={styles.orderNumber}>Order No {selectedOrder.id}</Text>
                <Text style={styles.orderDate}>{selectedOrder.date}{'\n'}{selectedOrder.time}</Text>
              </View>
              <View style={{ marginVertical: 20 }}>
                {selectedOrder.items.map((item: any) => (
                  <View key={item.id} style={styles.orderItemRow}>
                    
                    {/* SAMA KAYAK DI ATAS, GANTI JUGA DI DALAM MODAL */}
                    <View style={styles.itemImagePlaceholder}>
                      {item.image ? (
                        <Image source={item.image} style={styles.itemImage} />
                      ) : (
                        <Ionicons name="cafe" size={24} color="#A08069" />
                      )}
                    </View>

                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemDesc}>{item.desc}</Text>
                    </View>
                    <Text style={styles.itemQty}>{item.qty}</Text>
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

const styles = StyleSheet.create({
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 30, width: '100%' },
  orderCard: { backgroundColor: '#FDF8E4', borderRadius: 20, padding: 25, width: 350, elevation: 3 },
  orderCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  orderNumber: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  orderDate: { fontSize: 12, color: '#333', textAlign: 'right' },
  orderItemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  
  // Styling Container Gambar
  itemImagePlaceholder: { 
    width: 50, 
    height: 50, 
    backgroundColor: '#EAE0D1', 
    borderRadius: 25, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 15,
    overflow: 'hidden', // <-- Penting biar gambarnya ikut melengkung (bulat)
  },
  // 3. TAMBAHIN STYLING GAMBARNYA
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Biar gambarnya menuhin buletan
  },

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