import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform, StatusBar } from 'react-native';

// --- DATA DUMMY ---
const orderDetails = {
  orderNo: '124',
  date: '12-10-2025',
  time: '10:15',
  items: [
    { id: 1, name: 'Hot Latte', desc: 'Size : Regular Sugar : normal', qty: 1, imageKey: 'latte' },
    { id: 2, name: 'Iced Matcha Latte', desc: 'Size : Large Sugar : normal', qty: 1, imageKey: 'matcha' },
    { id: 3, name: 'Mochi', desc: 'Flavor : 2 Matcha, 1 Vanilla', qty: 1, imageKey: 'mochi' },
  ],
  // 0: Confirmed, 1: Payment, 2: Processed, 3: Pickup
  currentStatusIndex: 1, 
};

const images: any = {
  latte: require('../../assets/images/latte.png'),
  matcha: require('../../assets/images/Matcha.png'),
  mochi: require('../../assets/images/mochi.png'),
};

export default function OrderStatusScreen() {
  const router = useRouter();
  const statusSteps = ['Order\nConfirmed', 'Payment', 'Processed', 'Pickup'];

  // Hitung lebar garis aktif (persentase)
  const progressWidth = (orderDetails.currentStatusIndex / (statusSteps.length - 1)) * 100;

  return (
    // UDAH BUKAN SafeAreaView LAGI BIAR GAK ADA JARAK KOSONG
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* ========================================================= */}
      {/* HEADER STUCK: Persis kaya di Profile dan Order History */}
      {/* ========================================================= */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome Back Ada</Text>
          <Text style={styles.email}>Adawong@gmail.com</Text>
        </View>
        <Image
          source={require("../../assets/images/adawong.jpg")}
          style={styles.avatar}
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

        {/* KARTU PESANAN */}
        <View style={styles.orderCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.orderNoText}>Order No {orderDetails.orderNo}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.dateText}>{orderDetails.date}</Text>
              <Text style={styles.timeText}>{orderDetails.time}</Text>
            </View>
          </View>

          {/* TIMELINE SECTION (TEKNIK LAYER) */}
          <View style={styles.timelineWrapper}>
            {/* 1. Garis Dasar (Putih) */}
            <View style={styles.baseLine} />
            
            {/* 2. Garis Progress (Coklat) */}
            <View style={[styles.activeLine, { width: `${progressWidth}%` }]} />

            {/* 3. Lingkaran & Teks */}
            <View style={styles.stepsContainer}>
              {statusSteps.map((step, index) => {
                const isDone = index <= orderDetails.currentStatusIndex;
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
            {orderDetails.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Image source={images[item.imageKey]} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>
                <Text style={styles.itemQty}>{item.qty}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* TOMBOL BACK */}
        <TouchableOpacity style={styles.homeBtn} onPress={() => router.push('/profile')}>
          <Text style={styles.homeBtnText}>Back to Profile</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#EDE3D3',
    // PADDING TOP DIHAPUS DARI SINI
  },
  
  /* --- STYLE HEADER STUCK --- */
  header: {
    backgroundColor: "#422A1E",
    paddingHorizontal: 20,
    paddingBottom: 20,
    // PADDING TOP DIPINDAH KESINI BIAR MENTOK ATAS LAYAR
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 20 : 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  welcome: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  email: { color: "#fff", opacity: 0.8, marginTop: 2, fontSize: 13 },
  avatar: { width: 45, height: 45, borderRadius: 25 },

  /* --- STYLE SCROLLVIEW --- */
  scrollArea: {
    flex: 1, 
  },
  scrollContent: { 
    flexGrow: 1,
    paddingBottom: 150, // PANCINGAN BAWAH BIAR LEGA SCROLLNYA
    paddingTop: 10,
  },

  /* LOGO TENGAH */
  logoContainer: { 
    alignItems: "center",
    justifyContent: "center",
  },

  /* CARD */
  orderCard: {
    backgroundColor: '#F7EDD5',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 20,
    paddingTop: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  orderNoText: { fontSize: 18, fontWeight: 'bold', color: '#33241C' },
  dateText: { fontSize: 13, color: '#666' },
  timeText: { fontSize: 13, color: '#666', marginTop: 2 },

  /* TIMELINE TEKNIK BARU */
  timelineWrapper: {
    height: 100,
    marginVertical: 10,
    justifyContent: 'flex-start',
    position: 'relative',
  },
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
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  stepItem: {
    width: '25%', 
    alignItems: 'center',
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#C07C33',
    zIndex: 10, 
  },
  circleActive: {
    backgroundColor: '#C07C33',
  },
  stepLabel: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
  stepLabelActive: {
    color: '#33241C',
    fontWeight: 'bold',
  },

  /* LIST ITEMS */
  orderTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  itemsList: { gap: 15 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
  },
  itemImage: { width: 50, height: 50, resizeMode: 'contain' },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemName: { fontSize: 14, fontWeight: 'bold', color: '#33241C' },
  itemDesc: { fontSize: 11, color: '#666' },
  itemQty: { fontSize: 16, fontWeight: 'bold', color: '#33241C' },

  /* BUTTON */
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