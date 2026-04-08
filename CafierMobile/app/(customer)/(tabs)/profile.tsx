import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; 

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");

      await axios.post(
        "https://trinity-milliary-mitzie.ngrok-free.dev/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    } catch (e) {
      console.log("skip");
    } finally {
      await SecureStore.deleteItemAsync("userToken");
      router.replace("../../../(auth)/login");
    }
  };

  const renderMenuButton = (title: string, onPress?: () => void) => {
    return (
      <TouchableOpacity style={styles.menuBtn} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.menuText}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    // UDAH BUKAN SafeAreaView LAGI BIAR GAK ADA JARAK KOSONG
    <View style={styles.container}>
      
      {/* ========================================================= */}
      {/* HEADER STUCK: Sengaja ditaruh di sini biar nempel di atas! */}
      {/* ========================================================= */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome Back Ada</Text>
          <Text style={styles.email}>Adawong@gmail.com</Text>
        </View>
        <Image
          source={require("@/assets/images/adawong.jpg")}
          style={styles.avatar}
        />
      </View>

      {/* ========================================================= */}
      {/* SCROLLVIEW: Cuma bagian bawahnya aja yang bisa digulung */}
      {/* ========================================================= */}
      <ScrollView 
        style={styles.scrollArea} 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >

        {/* LOGO TENGAH */}
        <View style={[styles.logoContainer, { height: 100, justifyContent: 'center', marginTop: 10, marginBottom: 20 }]}>
          <Image 
            source={require('@/assets/images/serene-logo-cokelat.png')} 
            style={{ width: 250, height: 250, resizeMode: 'contain' }} 
          />
        </View>

        {/* MEMBERSHIP CARD */}
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

          <TouchableOpacity 
            style={styles.cardFooter} 
            onPress={() => router.push("../benefits")}
            activeOpacity={0.7}
          >
            <Text style={styles.benefit}>View Benefits</Text>
            <Ionicons name="chevron-forward" size={14} color="#FDF8EE" />
          </TouchableOpacity>
        </LinearGradient>

        {/* MENU BUTTONS */}
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
  container: {
    flex: 1,
    backgroundColor: "#EDE3D3",
    // PADDING TOP DIHAPUS DARI SINI
  },
  
  /* --- STYLE HEADER STUCK --- */
  header: {
    backgroundColor: "#422A1E",
    paddingHorizontal: 20,
    paddingBottom: 20,
    // PADDING TOP DIPINDAH KE SINI BIAR COKLATNYA BABLAS KE ATAS
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
    paddingBottom: 150, 
    paddingTop: 10,
  },

  /* --- STYLE LOGO --- */
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  /* --- STYLE CARD --- */
  card: {
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 20,
  },
  cardTitle: { fontSize: 22, fontWeight: "bold", color: "#FDF8EE" },
  cardSub: { marginTop: 4, fontSize: 13, color: "#FDF8EE", marginBottom: 20 },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(253, 248, 238, 0.2)', 
    borderRadius: 4,
    width: '100%',
    marginBottom: 12,
  },
  progressFill: { width: "75%", height: "100%", backgroundColor: "#FDF8EE", borderRadius: 4 },
  cardFooter: { flexDirection: "row", justifyContent: "flex-end", alignItems: "center" },
  benefit: { marginRight: 4, fontSize: 12, color: "#FDF8EE" },

  /* --- STYLE MENU --- */
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