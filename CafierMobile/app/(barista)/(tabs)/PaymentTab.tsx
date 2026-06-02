import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import api from '@/service/utils';

// Fungsi biar angkanya jadi format Rupiah
const formatRupiah = (number: number) => {
  if (!number) return "Rp 0";
  return "Rp " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function PaymentTab() {
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPayments = async (isBackground = false) => {
    if (!isBackground) setIsLoading(true);
    try {
      const response = await api.get('/barista/orders');
      setPayments(response.data.data || []);
    } catch (e) {
      console.error("Gagal tarik data payment:", e);
    } finally {
      if (!isBackground) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();

    const interval = setInterval(() => {
      fetchPayments(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <ActivityIndicator size="large" color="#422918" />
        <Text style={{ marginTop: 10, color: '#422918' }}>Narik notifikasi pembayaran...</Text>
      </View>
    );
  }

  // 🚨 SARINGAN BARU: Cuma nampilin yang urusannya sama pembayaran (Pending atau Lunas/Completed)
  const activePayments = payments.filter((data) => {
    const s = (data.status || '').toLowerCase();
    return s === 'pending' || s === 'completed' || s === 'lunas' || s === 'paid';
  });

  if (!activePayments || activePayments.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <Text style={{ fontSize: 16, color: '#7f8c8d' }}>Belum ada data transaksi pembayaran nih.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
      <View style={styles.gridContainer}>
        {activePayments.map((data) => {
          const statusLower = (data.status || '').toLowerCase();
          
          // 🚨 BIKIN RAPI: Kalau lunas/paid, teksnya diseragamkan jadi "Completed" biar cakep
          const displayStatus = (statusLower === 'lunas' || statusLower === 'paid' || statusLower === 'completed') ? 'Completed' : 'Pending';
          const statusBadgeColor = displayStatus === 'Pending' ? '#FDCB2C' : '#2ecc71'; 

          const customerName = data.user?.name || data.customer_name || 'Customer';
          const paymentMethod = data.payment_method || 'QRIS';

          return (
            <View key={data.id} style={styles.card}>
              
              <View style={styles.cardHeader}>
                <Text style={styles.orderNumber}>Order No {data.invoice_number || data.id}</Text>
                <Text style={styles.orderDate}>{data.date}{'\n'}{data.time}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Customer</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.valueText} numberOfLines={1}>{customerName}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Total</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{formatRupiah(data.total_amount || data.total || 0)}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Status</Text>
                <View style={styles.valueContainer}>
                    <View style={[styles.badge, { backgroundColor: statusBadgeColor }]}>
                      <Text style={styles.badgeText} numberOfLines={1}>
                        {displayStatus}
                      </Text>
                    </View>
                </View>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Method</Text>
                <View style={styles.valueContainer}>
                    <View style={[styles.badge, { backgroundColor: '#2ecc71' }]}>
                      <Text style={styles.badgeText}>{paymentMethod.toUpperCase()}</Text>
                    </View>
                </View>
              </View>

            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gridContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    gap: 30, 
    width: '100%',
    paddingHorizontal: 20
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
  orderNumber: { fontSize: 16, fontWeight: 'bold', color: '#000', flex: 1 },
  orderDate: { fontSize: 12, color: '#333', textAlign: 'right', marginLeft: 10 },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  label: { 
    width: 120, 
    fontSize: 18, 
    color: '#000' 
  },
  valueContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  valueText: { 
    fontSize: 18, 
    color: '#000',
    fontWeight: '500'
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