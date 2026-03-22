import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Platform, StatusBar } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ChangeProfileScreen() {
  const router = useRouter();

  // State buat nyimpen inputan user
  const [username, setUsername] = useState("Ada");
  const [email, setEmail] = useState("Adawong@gmail.com");
  const [password, setPassword] = useState("**********");
  const [dob, setDob] = useState("19 January 2025");
  const [joined, setJoined] = useState("1 December 2025");

  // Fungsi dummy buat ganti foto
  const handleChangePhoto = () => {
    console.log("Tombol ganti foto dipencet!");
    alert("Fitur buka galeri bakal jalan kalau udah install expo-image-picker bre!");
  };

  return (
    // Gak pake SafeAreaView lagi biar coklatnya bablas ke atas
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* ========================================================= */}
      {/* HEADER STUCK: Sengaja ditaruh di sini biar nempel di atas! */}
      {/* ========================================================= */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcome}>Welcome Back Ada</Text>
          <Text style={styles.emailText}>Adawong@gmail.com</Text>
        </View>

        {/* Tombol Ganti Foto (Avatar + Ikon Kamera) */}
        <TouchableOpacity style={styles.avatarContainer} onPress={handleChangePhoto} activeOpacity={0.8}>
          <Image
            source={require("../../assets/images/adawong.jpg")}
            style={styles.avatar}
          />
          <View style={styles.editBadge}>
            <Ionicons name="camera" size={16} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>

      {/* ========================================================= */}
      {/* SCROLLVIEW: Cuma bagian bawahnya aja yang bisa digulung */}
      {/* ========================================================= */}
      <ScrollView 
        style={styles.scrollArea} 
        contentContainerStyle={styles.formContainer} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* LOGO TENGAH */}
        <View style={[styles.logoContainer, { height: 100, justifyContent: 'center', marginTop: 10, marginBottom: 20 }]}>
          <Image 
            source={require('../../assets/images/serene-logo-cokelat.png')} 
            style={{ width: 250, height: 250, resizeMode: 'contain' }} 
          />
        </View>

        {/* Username */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput 
            style={styles.input} 
            value={username} 
            onChangeText={setUsername} 
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry={true} 
          />
        </View>

        {/* Date of Birth */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of birth</Text>
          <TextInput 
            style={styles.input} 
            value={dob} 
            onChangeText={setDob} 
          />
        </View>

        {/* Joined Membership */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Joined membership since</Text>
          <TextInput 
            style={[styles.input, { color: '#666' }]} 
            value={joined} 
            editable={false} 
          />
        </View>

        {/* TOMBOL BACK TO PROFILE */}
        <TouchableOpacity style={styles.saveBtn} onPress={() => router.push('/profile')} activeOpacity={0.8}>
          <Text style={styles.saveBtnText}>Back to Profile</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE3D3", 
  },

  /* --- STYLE HEADER STUCK --- */
  header: {
    backgroundColor: "#422A1E",
    paddingHorizontal: 20,
    paddingBottom: 20,
    // PADDING TOP NGITUNG OTOMATIS BIAR MENTOK LAYAR ATAS
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
  headerTextContainer: {
    flex: 1,
  },
  welcome: { 
    color: "#fff", 
    fontSize: 22, 
    fontWeight: "600" 
  },
  emailText: { 
    color: "#fff", 
    opacity: 0.8, 
    marginTop: 4,
    fontSize: 14 
  },

  /* LOGO TENGAH */
  logoContainer: { 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  
  /* AVATAR & KAMERA */
  avatarContainer: {
    position: "relative",
  },
  avatar: { 
    width: 60, 
    height: 60, 
    borderRadius: 30 
  },
  editBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#C7772F", 
    borderRadius: 15,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#5A3E2B", 
  },

  /* --- STYLE SCROLLVIEW --- */
  scrollArea: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    flexGrow: 1, // KUNCI BIAR BISA DI-SCROLL
    paddingBottom: 150, // PANCINGAN JARAK BAWAH
  },

  /* FORM KONTEN */
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    backgroundColor: "#EFE2CD", 
    borderWidth: 1,
    borderColor: "#5A3E2B", 
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: "#000",
  },

  /* TOMBOL BACK */
  saveBtn: {
    backgroundColor: "#C7772F",
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});