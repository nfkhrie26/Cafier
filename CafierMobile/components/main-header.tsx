import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, StatusBar } from 'react-native';
import api from '@/service/utils'; // 🚨 Pastikan path api-nya bener ya

export default function MainHeader() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // 🚨 Ambil data user yang lagi login (biar muncul nama Dauhan, bukan Ada Wong lagi)
      const response = await api.get('/user');
      setUserData(response.data);
    } catch (error) {
      console.log("Header gagal ambil data user:", error);
    }
  };

  // Ambil nama depan aja biar gak kepanjangan di header
  const displayName = userData?.name ? userData.name.split(' ')[0] : "User";
  const displayEmail = userData?.email || "loading...";

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.welcomeText}>Welcome Back {displayName}</Text>
        <Text style={styles.emailText}>{displayEmail}</Text>
      </View>
      <Image
        // 🚨 Sementara pake foto ini dulu, nanti kalau ada API foto tinggal ganti uri
        source={require("@/assets/images/adawong.jpg")} 
        style={styles.avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#422A1E",
    paddingHorizontal: 25,
    paddingBottom: 25,
    // Atur jarak aman buat status bar (Notch iPhone/Android)
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 20 : 60,
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
  welcomeText: { 
    color: "#fff", 
    fontSize: 22, 
    fontWeight: "bold" 
  },
  emailText: { 
    color: "#fff", 
    opacity: 0.8, 
    fontSize: 14, 
    marginTop: 2 
  },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    borderWidth: 1.5, 
    borderColor: 'rgba(255,255,255,0.3)' 
  },
});