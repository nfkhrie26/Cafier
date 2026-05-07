import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router'; // 🚨 IMPORT INI DITAMBAHKAN
import React, { useCallback, useState } from 'react'; // 🚨 useCallback DITAMBAHKAN
import { Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import api from '@/service/utils';

export default function MainHeader() {
  const [userData, setUserData] = useState<any>(null);

  // 🚨 GANTI useEffect JADI useFocusEffect
  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        try {
          const response = await api.get('/user');
          setUserData(response.data);
        } catch (error) {
          console.log("Header gagal ambil data user:", error);
        }
      };

      fetchUserData();
    }, [])
  );

  const displayName = userData?.name ? userData.name.split(' ')[0] : "User";
  const displayEmail = userData?.email || "loading...";

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.welcomeText}>Welcome Back, {displayName}! </Text>
        <Text style={styles.emailText}>{displayEmail}</Text>
      </View>
      
      {userData?.photo ? (
        <Image
          source={{ uri: userData.photo }} 
          style={styles.avatar}
        />
      ) : (
        <View style={[styles.avatar, styles.defaultAvatar]}>
          <Ionicons name="person" size={26} color="#5A3E2B" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#422A1E",
    paddingHorizontal: 25,
    paddingBottom: 25,
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
  defaultAvatar: {
    backgroundColor: '#EFE2CD',
    justifyContent: 'center',
    alignItems: 'center',
  }
});