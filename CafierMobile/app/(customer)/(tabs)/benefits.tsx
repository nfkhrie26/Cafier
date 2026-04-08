import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useVouchers } from '@/context/voucher-context';

export default function BenefitsScreen() {
  const router = useRouter();
  
  const { claimVoucher, claimedVoucherIds, availableVouchers } = useVouchers();

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back Ada</Text>
          <Text style={styles.emailText}>Adawong@gmail.com</Text>
        </View>
        <Image 
          source={require('@/assets/images/adawong.jpg')} 
          style={styles.profileImage} 
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

        <LinearGradient
          colors={['#2C1E14', '#593C2A', '#5E432E', '#593C2A', '#2C1E14']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>Platinum</Text>
          <Text style={styles.cardSub}>30 Points away from Gold</Text>

          <View style={styles.progressBarBg}>
            <View style={styles.progressFill} />
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['#2C1E14', '#593C2A']}
          style={styles.voucherTitleContainer}
        >
          <Text style={styles.voucherTitleText}>Vouchers</Text>
        </LinearGradient>

        <View style={styles.listContainer}>
          {availableVouchers.map((v) => {
            const isAlreadyClaimed = claimedVoucherIds.includes(v.id);

            return (
              <View key={v.id} style={styles.voucherCard}>
                <View style={styles.ticketEdge}>
                  {[...Array(6)].map((_, i) => (
                    <View key={i} style={styles.dot} />
                  ))}
                </View>

                <View style={styles.voucherContent}>
                  <Text style={styles.vTitle}>{v.title}</Text>
                  <Text style={styles.vDesc}>{v.desc}</Text>
                  
                  <TouchableOpacity 
                    style={[styles.claimBtn, isAlreadyClaimed && { backgroundColor: '#888' }]} 
                    onPress={() => {
                      if (!isAlreadyClaimed) claimVoucher(v.id); // <--- FIX: Kirim v.id (angka), bukan objek!
                    }}
                    disabled={isAlreadyClaimed}
                  >
                    <Text style={styles.claimText}>
                      {isAlreadyClaimed ? 'Claimed' : 'Claim'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('../profile')}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>Back to Profile</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E5D9C6' },
  header: {
    backgroundColor: '#422A1E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 20 : 50,
    zIndex: 10,
    elevation: 5,
  },
  welcomeText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  emailText: { color: '#FFF', fontSize: 13, opacity: 0.8, marginTop: 2 },
  profileImage: { width: 45, height: 45, borderRadius: 25, borderWidth: 1, borderColor: '#FFF' },
  scrollArea: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingTop: 10, paddingBottom: 150 },
  logoContainer: { alignItems: 'center', justifyContent: 'center' },
  card: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 22,
    paddingBottom: 30, 
    marginBottom: 35,
    elevation: 5,
  },
  cardTitle: { fontSize: 24, fontWeight: "bold", color: "#FDF8EE" },
  cardSub: { marginTop: 6, fontSize: 13, color: "#FDF8EE", marginBottom: 25 },
  progressBarBg: { height: 8, backgroundColor: 'rgba(253, 248, 238, 0.2)', borderRadius: 4, width: '100%' },
  progressFill: { width: "75%", height: "100%", backgroundColor: "#FDF8EE", borderRadius: 4 },
  voucherTitleContainer: { alignSelf: 'center', paddingHorizontal: 65, paddingVertical: 14, borderRadius: 20, marginBottom: 25 },
  voucherTitleText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  listContainer: { paddingHorizontal: 20 },
  voucherCard: { flexDirection: 'row', backgroundColor: '#FFF9EF', borderRadius: 15, marginBottom: 20, height: 145, overflow: 'hidden', elevation: 3 },
  ticketEdge: { width: 35, backgroundColor: '#F2E8D5', justifyContent: 'space-around', alignItems: 'center', borderRightWidth: 1, borderRightColor: '#DDD', borderStyle: 'dashed' },
  dot: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#E5D9C6', marginLeft: -18 },
  voucherContent: { flex: 1, padding: 18, justifyContent: 'center' },
  vTitle: { fontSize: 18, fontWeight: 'bold', color: '#33241C', marginBottom: 6 },
  vDesc: { fontSize: 12, color: '#555', lineHeight: 18, marginBottom: 12 },
  claimBtn: { backgroundColor: '#C97C3A', alignSelf: 'flex-end', paddingHorizontal: 22, paddingVertical: 8, borderRadius: 18 },
  claimText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  backButton: { backgroundColor: '#C97C3A', marginHorizontal: 30, marginTop: 30, paddingVertical: 18, borderRadius: 20, alignItems: 'center' },
  backButtonText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
});