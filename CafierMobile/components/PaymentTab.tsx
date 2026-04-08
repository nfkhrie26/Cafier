import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// DATA MOCK SESUAI GAMBAR LU
const PAYMENT_DATA = [
  { id: '124', date: '12-10-2026', time: '10:00', customer: 'Mamat', total: 'RP : 125.000', status: 'Completed', method: 'Qris' },
  { id: '125', date: '12-10-2026', time: '10:10', customer: 'Cila', total: 'RP : 125.000', status: 'Completed', method: 'Master Card' },
  { id: '126', date: '12-10-2026', time: '10:15', customer: 'Adawong', total: 'RP : 125.000', status: 'Completed', method: 'Qris' },
  { id: '127', date: '12-10-2026', time: '10:17', customer: 'Michell', total: 'RP : 125.000', status: 'Completed', method: 'Qris' },
  { id: '128', date: '12-10-2026', time: '10:18', customer: 'Angel', total: 'RP : 125.000', status: 'Pending', method: 'Master Card' },
  { id: '129', date: '12-10-2026', time: '10:20', customer: 'Leon', total: 'RP : 125.000', status: 'Pending', method: 'Master Card' },
];

export default function PaymentTab() {
  return (
    <View style={styles.gridContainer}>
      {PAYMENT_DATA.map((data) => (
        <View key={data.id} style={styles.card}>
          
          {/* Header Kartu */}
          <View style={styles.cardHeader}>
            <Text style={styles.orderNumber}>Order No {data.id}</Text>
            <Text style={styles.orderDate}>{data.date}{'\n'}{data.time}</Text>
          </View>

          {/* Baris 1: Customer */}
          <View style={styles.row}>
            <Text style={styles.label}>Customer</Text>
            <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{data.customer}</Text>
            </View>
          </View>

          {/* Baris 2: Total */}
          <View style={styles.row}>
            <Text style={styles.label}>Total</Text>
            <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{data.total}</Text>
            </View>
          </View>

          {/* Baris 3: Status */}
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.valueContainer}>
                <View style={[styles.badge, { backgroundColor: data.status === 'Completed' ? '#2ecc71' : '#FDCB2C' }]}>
                <Text style={styles.badgeText}>{data.status}</Text>
                </View>
            </View>
          </View>

          {/* Baris 4: Method */}
          <View style={styles.row}>
            <Text style={styles.label}>Method</Text>
            <View style={styles.valueContainer}>
                <View style={[styles.badge, { backgroundColor: '#2ecc71' }]}>
                <Text style={styles.badgeText}>{data.method}</Text>
                </View>
            </View>
          </View>

        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    gap: 30, 
    width: '100%' 
  },
  card: { 
    backgroundColor: '#FDF8E4', 
    borderRadius: 20, 
    padding: 25, 
    width: 350, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 25 
  },
  orderNumber: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  orderDate: { fontSize: 12, color: '#333', textAlign: 'right' },
  
  // Styling Baris (Alignment)
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  label: { 
    width: 120, // Lebar fixed biar titik duanya sejajar semua
    fontSize: 18, 
    color: '#000' 
  },
  valueContainer: {
    flex: 1,
    alignItems: 'flex-start', // Biar teks dan badge mulai dari garis yang sama
  },
  valueText: { 
    fontSize: 18, 
    color: '#000' 
  },
  badge: { 
    paddingVertical: 6, 
    paddingHorizontal: 20, 
    borderRadius: 20, 
    alignItems: 'center', 
    minWidth: 100 
  },
  badgeText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' }
});