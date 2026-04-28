import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; 
import api from '@/service/utils'; 
import MainHeader from '@/components/main-header';

export default function ProfileScreen() {
  const router = useRouter();

  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  const TARGET_GOLD = 31; 
  const TARGET_PLATINUM = 71; 

  useEffect(() => {
    fetchPointsFromHistory();
  }, []);

  const fetchPointsFromHistory = async () => {
    try {
      const response = await api.get('/history');
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
              pts = 6;
            } else if (combinedText.includes('regular') || combinedText.includes('normal')) {
              pts = 4;
            } else {
              pts = 2;
            }
            calculatedPoints += (pts * (item.quantity || item.qty || 1));
          });
        }
      });
      setTotalPoints(calculatedPoints);
    } catch (error) {
      console.log("Gagal hitung poin:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      await api.post("/logout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) {
      console.log("Logout error skipped");
    } finally {
      await SecureStore.deleteItemAsync("userToken");
      router.replace("../../../(auth)/login");
    }
  };

  const renderMenuButton = (title: string, onPress?: () => void) => (
    <TouchableOpacity style={styles.menuBtn} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#fff" />
    </TouchableOpacity>
  );

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
      <MainHeader />

      <ScrollView 
        style={styles.scrollArea} 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/serene-logo-cokelat.png')} 
            // 🚨 GEDEIN DI SINI: height diubah jadi 250 biar gak kecil lagi
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

            <TouchableOpacity 
              style={styles.cardFooter} 
              onPress={() => router.push("../benefits")}
              activeOpacity={0.7}
            >
              <Text style={[styles.benefit, { color: textColor }]}>View Benefits</Text>
              <Ionicons name="chevron-forward" size={14} color={textColor} />
            </TouchableOpacity>
          </LinearGradient>
        )}

        <View style={styles.menuContainer}>
          {renderMenuButton("Change Profile", () => router.push("../change-profile"))}
          {renderMenuButton("Order Status", () => router.push("../order-status"))}
          {renderMenuButton("Order History", () => router.push("../order-history"))}
          {renderMenuButton("Logout", handleLogout)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EDE3D3" },
  scrollArea: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 150, paddingTop: 10 },
  // 🚨 GEDEIN DI SINI JUGA: height diubah jadi 150 biar gambarnya gak kepotong container
  logoContainer: { alignItems: "center", justifyContent: "center", height: 150, marginTop: 10, marginBottom: 20 },
  card: {
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 20,
    height: 140, 
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: { fontSize: 22, fontWeight: "bold" },
  cardSub: { marginTop: 4, fontSize: 13, marginBottom: 20 },
  progressBarBg: { height: 6, borderRadius: 4, width: '100%', marginBottom: 12 },
  progressFill: { height: "100%", borderRadius: 4 },
  cardFooter: { flexDirection: "row", justifyContent: "flex-end", alignItems: "center" },
  benefit: { marginRight: 4, fontSize: 12 },
  menuContainer: { marginTop: 25, paddingHorizontal: 20 },
  menuBtn: {
    backgroundColor: "#C7772F",
    borderRadius: 15, 
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  menuText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
});