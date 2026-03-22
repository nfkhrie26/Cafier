import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

// DATA DUMMY
const MOCK_ORDERS = [
  {
    id: '124',
    date: '12-10-2025',
    time: '10:15',
    status: 'Processed',
    statusColor: '#FFCC00', // Kuning
    items: [
      { id: 1, name: 'Hot Latte', desc: 'Size : normal  Sugar : normal', qty: 1, img: require('../../assets/images/latte.png') },
      { id: 2, name: 'Iced Matcha Latte', desc: 'Size : Large  Sugar : normal', qty: 1, img: require('../../assets/images/Matcha.png') },
      { id: 3, name: 'Mochi', desc: 'Flovor : 2 Matcha, 1 Vanilla', qty: 1, img: require('../../assets/images/mochi.png') },
    ]
  },
  {
    id: '100',
    date: '12-10-2025',
    time: '10:15',
    status: 'Completed',
    statusColor: '#2ECC71', // Hijau
    items: [
      { id: 4, name: 'Hot Latte', desc: 'Size : normal  Sugar : normal', qty: 1, img: require('../../assets/images/latte.png') },
      { id: 5, name: 'Iced Matcha Latte', desc: 'Size : Large  Sugar : normal', qty: 1, img: require('../../assets/images/Matcha.png') },
      { id: 6, name: 'Mochi', desc: 'Flovor : 2 Matcha, 1 Vanilla', qty: 1, img: require('../../assets/images/mochi.png') },
    ]
  }
];

export default function OrderHistory() {
  const router = useRouter();

  return (
    // UDAH BUKAN SafeAreaView LAGI BIAR GAK ADA JARAK KOSONG DI ATAS
    <View style={styles.container}>
      
      {/* ========================================================= */}
      {/* HEADER STUCK: Ditaruh di luar ScrollView biar nempel di atas */}
      {/* ========================================================= */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back Ada</Text>
          <Text style={styles.emailText}>Adawong@gmail.com</Text>
        </View>
        <Image 
          source={require('../../assets/images/adawong.jpg')} 
          style={styles.profileImage} 
        />
      </View>

      {/* ========================================================= */}
      {/* SCROLLVIEW: Buat bagian konten di bawahnya */}
      {/* ========================================================= */}
      <ScrollView 
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >

        {/* LOGO TENGAH */}
        <View style={[styles.logoContainer, { height: 100, justifyContent: 'center', marginTop: 10, marginBottom: 20 }]}>
          <Image 
            source={require('../../assets/images/serene-logo-cokelat.png')} 
            style={{ width: 250, height: 250, resizeMode: 'contain' }} 
          />
        </View>

        {/* LOOPING KARTU PESANAN */}
        {MOCK_ORDERS.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            {/* Header Kartu */}
            <View style={styles.orderCardHeader}>
              <Text style={styles.orderNo}>Order No {order.id}</Text>
              <Text style={styles.orderDate}>{order.date}{"\n"}{order.time}</Text>
            </View>

            <Text style={styles.orderLabel}>Order</Text>

            {/* List Item dalam Kartu */}
            {order.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Image source={item.img} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>
                <Text style={styles.itemQty}>{item.qty}</Text>
              </View>
            ))}

            {/* Status Badge */}
            <View style={[styles.statusBadge, { backgroundColor: order.statusColor }]}>
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>
        ))}

        {/* TOMBOL BACK */}
        <TouchableOpacity 
          style={styles.btnBack} 
          onPress={() => router.push('/profile')}
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
    // PADDING TOP DIHAPUS DARI SINI
  },
  
  /* --- STYLE HEADER STUCK --- */
  header: {
    backgroundColor: '#422A1E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 20,
    // PADDING TOP DIPINDAH KESINI BIAR MENTOK ATAS LAYAR
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 20 : 50,
    zIndex: 10, // Biar selalu di depan pas di-scroll
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  welcomeText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  emailText: { color: '#FFF', fontSize: 13, opacity: 0.8, marginTop: 2 },
  profileImage: { width: 45, height: 45, borderRadius: 25, borderWidth: 1, borderColor: '#FFF' },

  /* --- STYLE SCROLLVIEW --- */
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 150, // <-- NAH INI UDAH GW GEDEIN BIAR LEGA BRE
  },

  /* LOGO TENGAH */
  logoContainer: { 
    alignItems: 'center', 
    justifyContent: 'center',
  },

  /* KARTU PESANAN */
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
  orderNo: { fontSize: 18, fontWeight: 'bold', color: '#33241C' },
  orderDate: { fontSize: 12, color: '#888', textAlign: 'right' },
  orderLabel: { fontSize: 18, fontWeight: 'bold', color: '#33241C', textAlign: 'center', marginVertical: 15 },
  
  /* ITEM DALAM PESANAN */
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  itemImage: { width: 55, height: 55, borderRadius: 27.5 },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemName: { fontSize: 15, fontWeight: 'bold', color: '#603813', marginBottom: 2 },
  itemDesc: { fontSize: 11, color: '#999' },
  itemQty: { fontSize: 18, fontWeight: 'bold', color: '#33241C', marginRight: 10 },
  
  /* STATUS BADGE */
  statusBadge: {
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  statusText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

  /* TOMBOL BACK */
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