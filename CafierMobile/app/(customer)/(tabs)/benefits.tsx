import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router'; // 🚨 Tambahin useFocusEffect
import React, { useCallback, useState } from 'react'; // 🚨 Tambahin useCallback & useState
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'; // 🚨 Tambahin ActivityIndicator
import { useVouchers } from '@/context/voucher-context';
import api from '@/service/utils'; // 🚨 Import API buat narik data
import MainHeader from '@/components/main-header'; // 🚨 Panggil MainHeader jagoan kita

export default function BenefitsScreen() {
  const router = useRouter();
  const { claimVoucher, claimedVoucherIds, availableVouchers } = useVouchers();

  // 🚨 State buat nampung poin dan status loading
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  const TARGET_GOLD = 31; 
  const TARGET_PLATINUM = 81; 

  // 🚨 Tarik data poin setiap kali halaman ini dibuka
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPointsFromHistory = async () => {
        setLoading(true);
        try {
          const response = await api.get('/history');
          if (!isActive) return;

          const dataAsli = response.data.data || [];
          let calculatedPoints = 0;

          dataAsli.forEach((order: any) => {
            const status = order.status?.toLowerCase();
            if (['lunas', 'diproses', 'processing', 'ready', 'completed'].includes(status)) {
              order.items?.forEach((item: any) => {
                const notes = (item.notes || '').toLowerCase();
                const variantNames = item.variantDetails ? item.variantDetails.map((v: any) => v.name.toLowerCase()).join(' ') : '';
                const combinedText = `${notes} ${variantNames} ${item.name?.toLowerCase()}`;

                let pts = 2; 
                if (combinedText.includes('large')) {
                  pts = 5;
                } else if (combinedText.includes('regular') || combinedText.includes('normal')) {
                  pts = 3;
                } else {
                  pts = 2;
                }
                calculatedPoints += (pts * (item.quantity || item.qty || 1));
              });
            }
          });
          setTotalPoints(calculatedPoints);
        } catch (error) {
          console.log("Gagal hitung poin di benefits:", error);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchPointsFromHistory();

      return () => {
        isActive = false;
      };
    }, [])
  );

  // 🚨 Logika Tier dan Warna yang sama persis kayak Profile
  let currentTier = 'Silver';
  let pointsAway = 0;
  let nextTier = 'Gold';
  let progress = 0;
  let gradientColors: readonly [string, string, ...string[]] = ['#E4E4E4', '#F5F5F5']; 
  let textColor = '#33241C';
  let progressBg = '#D0D0D0';
  let progressFill = '#422A1E';

  if (totalPoints < TARGET_GOLD) {
    currentTier = 'Silver';
    pointsAway = TARGET_GOLD - totalPoints;
    nextTier = 'Gold';
    progress = totalPoints / (TARGET_GOLD - 1); 
    gradientColors = ['#E4E4E4', '#F5F5F5'];
    textColor = '#33241C';
    progressBg = '#D0D0D0';
    progressFill = '#422A1E';
  } else if (totalPoints < TARGET_PLATINUM) {
    currentTier = 'Gold';
    pointsAway = TARGET_PLATINUM - totalPoints;
    nextTier = 'Platinum';
    progress = (totalPoints - 30) / (TARGET_PLATINUM - 30);
    gradientColors = ['#E5A93D', '#F7D070'];
    textColor = '#FFF';
    progressBg = 'rgba(255,255,255,0.3)';
    progressFill = '#FFF';
  } else {
    currentTier = 'Platinum';
    pointsAway = 0;
    nextTier = 'Max';
    progress = 1;
    gradientColors = ['#2C1E14', '#593C2A', '#5E432E', '#593C2A', '#2C1E14'];
    textColor = '#FDF8EE';
    progressBg = 'rgba(253, 248, 238, 0.2)';
    progressFill = '#FDF8EE';
  }

  return (
    <View style={styles.container}>
      
      {/* 🚨 Panggil MainHeader biar fotonya sinkron! */}
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
          <View style={[styles.card, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#EAEAEA' }]}>
            <ActivityIndicator size="small" color="#422A1E" />
          </View>
        ) : (
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.card}
          >
            <Text style={[styles.cardTitle, { color: textColor }]}>{currentTier}</Text>
            
            {currentTier !== 'Platinum' ? (
              <Text style={[styles.cardSub, { color: textColor }]}>{pointsAway} Points away from {nextTier}</Text>
            ) : (
              <Text style={[styles.cardSub, { color: textColor }]}>Highest Tier Achieved! 🎉</Text>
            )}

            <View style={[styles.progressBarBg, { backgroundColor: progressBg }]}>
              <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: progressFill }]} />
            </View>
          </LinearGradient>
        )}

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
                      if (!isAlreadyClaimed) claimVoucher(v.id); 
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    justifyContent: 'center',
    height: 140, // Disamakan tingginya dengan Profile Screen biar konsisten
  },
  cardTitle: { fontSize: 24, fontWeight: "bold" },
  cardSub: { marginTop: 6, fontSize: 13, marginBottom: 25 },
  progressBarBg: { height: 8, borderRadius: 4, width: '100%' },
  progressFill: { height: "100%", borderRadius: 4 },
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