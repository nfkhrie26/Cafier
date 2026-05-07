import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView, // 🚨 IMPORT INI BIAR KEYBOARD GAK NUTUPIN LAYAR
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from 'expo-image-picker'; 
import api from "../../../service/utils"; 

export default function ChangeProfileScreen() {
  const router = useRouter();

  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(""); 
  const [joined, setJoined] = useState(""); 
  const [photo, setPhoto] = useState<string | null>(null); 
  const [newPhotoUri, setNewPhotoUri] = useState<string | null>(null); 

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user");
        const data = response.data;

        setName(data.name || "");
        setEmail(data.email || "");
        setPhoto(data.photo || null);
        
        if (data.dob) setDob(data.dob); 

        if (data.created_at) {
            const date = new Date(data.created_at);
            const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
            setJoined(date.toLocaleDateString('id-ID', options));
        }
      } catch (error) {
        console.error("Gagal load profil:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Izin Ditolak", "Kamu harus ngasih izin akses galeri buat ganti foto!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, 
      aspect: [1, 1],
      quality: 0.5, 
    });

    if (!result.canceled) {
      setNewPhotoUri(result.assets[0].uri); 
    }
  };

  const handleSaveProfile = async () => {
    if (!Name || !email) {
      Alert.alert("Peringatan", "Username dan Email wajib diisi!");
      return;
    }

    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", Name);
      formData.append("email", email);
      formData.append("dob", dob);
      
      if (password.trim() !== "") {
        formData.append("password", password);
      }

      formData.append("_method", "PUT");

      if (newPhotoUri) {
        let filename = newPhotoUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename || '');
        let type = match ? `image/${match[1]}` : `image`;

        formData.append("photo", {
          uri: newPhotoUri,
          name: filename,
          type: type,
        } as any);
      }

      await api.post("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Berhasil!", "Profil kamu sudah diperbarui.", [
        { text: "OK", onPress: () => router.push("../profile") },
      ]);
    } catch (error: any) {
      console.log("Error Update:", error.response?.data);
      Alert.alert("Gagal", error.response?.data?.message || "Gagal update profil.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#C7772F" />
      </View>
    );
  }

  return (
    // 🚨 BUNGKUS PAKAI KEYBOARD AVOIDING VIEW
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcome}>Edit Profile</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>

        <TouchableOpacity style={styles.avatarContainer} activeOpacity={0.7} onPress={pickImage}>
          {newPhotoUri ? (
             <Image source={{ uri: newPhotoUri }} style={styles.avatar} />
          ) : photo ? (
            <Image source={{ uri: photo }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.defaultAvatar]}>
               <Ionicons name="person" size={30} color="#5A3E2B" />
            </View>
          )}
          <View style={styles.editBadge}>
            <Ionicons name="camera" size={16} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollArea} 
        contentContainerStyle={styles.scrollContent} // 🚨 FIX: Sekarang beneran manggil scrollContent!
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" // Biar pas ngetik bisa klik sembarang buat nutup keyboard
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/serene-logo-cokelat.png")}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={Name} onChangeText={setName} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password Baru (Opsional)</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Kosongkan jika tidak diganti" placeholderTextColor="#A09381" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of birth</Text>
          <TextInput 
            style={styles.input} 
            value={dob} 
            onChangeText={setDob} 
            placeholder="YYYY-MM-DD" 
            placeholderTextColor="#A09381"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Joined membership since</Text>
          <TextInput style={[styles.input, styles.disabledInput]} value={joined} editable={false} />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile} disabled={isSaving}>
          {isSaving ? <ActivityIndicator color="#FFF" /> : <Text style={styles.saveBtnText}>Save Profile</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EDE3D3" },
  header: {
    backgroundColor: "#422A1E",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 20 : 50,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTextContainer: { flex: 1 },
  welcome: { color: "#fff", fontSize: 22, fontWeight: "600" },
  emailText: { color: "#fff", opacity: 0.8, marginTop: 4, fontSize: 14 },
  avatarContainer: { position: "relative" },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  defaultAvatar: { backgroundColor: '#EFE2CD', justifyContent: 'center', alignItems: 'center' },
  editBadge: { position: "absolute", bottom: -5, right: -5, backgroundColor: "#C7772F", borderRadius: 15, width: 28, height: 28, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "#5A3E2B" },
  scrollArea: { flex: 1 },
  // 🚨 FIX: Aku udah gabungin padding formContainer ke sini biar ringkas dan aman
  scrollContent: { flexGrow: 1, padding: 20, paddingTop: 10, paddingBottom: 150 }, 
  logoContainer: { alignItems: "center", justifyContent: "center", height: 100, marginTop: 10, marginBottom: 20 },
  logoImage: { width: 250, height: 250, resizeMode: "contain" },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "bold", color: "#000", marginBottom: 8, marginLeft: 5 },
  input: { backgroundColor: "#EFE2CD", borderWidth: 1, borderColor: "#5A3E2B", borderRadius: 15, paddingHorizontal: 15, paddingVertical: 14, fontSize: 16, color: "#000" },
  disabledInput: { color: "#666", backgroundColor: "#E0D4C3" },
  saveBtn: { backgroundColor: "#C7772F", borderRadius: 15, paddingVertical: 18, alignItems: "center", marginTop: 10 },
  saveBtnText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  cancelBtn: { marginTop: 20, alignItems: "center", paddingVertical: 10, marginBottom: 30 }, // 🚨 FIX: Tambahin marginBottom biar agak lega bawahnya
  cancelBtnText: { color: "#5A3E2B", fontSize: 16, fontWeight: "bold" },
});