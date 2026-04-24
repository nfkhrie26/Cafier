import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../../service/utils"; // Import api yang sudah ada tokennya

export default function ChangeProfileScreen() {
  const router = useRouter();

  // State untuk data input form, dikosongkan dulu sambil nunggu API
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("19 January 2025");
  const [joined, setJoined] = useState("1 December 2025");

  // State untuk animasi loading
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Ambil data user dari Laravel pas halaman pertama kali dibuka
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user");
        setUsername(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
        Alert.alert("Error", "Gagal memuat data profil");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fungsi dummy buat ganti foto
  const handleChangePhoto = () => {
    Alert.alert(
      "Info",
      "Fitur buka galeri bakal jalan kalau udah install expo-image-picker bre!",
    );
  };

  // Fungsi buat nyimpen data ke API
  const handleSaveProfile = async () => {
    if (!username || !email) {
      Alert.alert("Peringatan", "Username dan Email tidak boleh kosong!");
      return;
    }

    setIsSaving(true);

    try {
      const payload: any = {
        name: username,
        email: email,
      };

      // Kalau password diisi, baru kirim ke backend
      if (password.trim() !== "") {
        payload.password = password;
      }

      await api.put("/profile", payload);

      Alert.alert("Berhasil!", "Profil kamu berhasil diperbarui.", [
        { text: "OK", onPress: () => router.push("../profile") },
      ]);
    } catch (error: any) {
      console.error(error.response?.data);
      Alert.alert(
        "Gagal",
        error.response?.data?.message ||
          "Gagal memperbarui profil. Cek kembali datamu.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Tampilan layar saat masih narik data dari server
  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#C7772F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* ========================================================= */}
      {/* HEADER STUCK: Sengaja ditaruh di sini biar nempel di atas! */}
      {/* ========================================================= */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcome}>Edit Profile</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>

        {/* Tombol Ganti Foto (Avatar + Ikon Kamera) */}
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={handleChangePhoto}
          activeOpacity={0.8}
        >
          <Image
            source={require("@/assets/images/adawong.jpg")}
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
        <View
          style={[
            styles.logoContainer,
            {
              height: 100,
              justifyContent: "center",
              marginTop: 10,
              marginBottom: 20,
            },
          ]}
        >
          <Image
            source={require("@/assets/images/serene-logo-cokelat.png")}
            style={{ width: 250, height: 250, resizeMode: "contain" }}
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
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password Baru (Opsional)</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="Kosongkan jika tidak diganti"
            placeholderTextColor="#A09381"
          />
        </View>

        {/* Date of Birth */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of birth</Text>
          <TextInput style={styles.input} value={dob} onChangeText={setDob} />
        </View>

        {/* Joined Membership */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Joined membership since</Text>
          <TextInput
            style={[
              styles.input,
              { color: "#666", backgroundColor: "#E0D4C3" },
            ]}
            value={joined}
            editable={false}
          />
        </View>

        {/* TOMBOL SAVE PROFILE */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSaveProfile}
          activeOpacity={0.8}
          disabled={isSaving} // Matiin tombol pas lagi proses save
        >
          {isSaving ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.saveBtnText}>Save Profile</Text>
          )}
        </TouchableOpacity>

        {/* TOMBOL CANCEL / BACK */}
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.push("../profile")}
          activeOpacity={0.6}
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
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
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 20 : 50,
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
    fontWeight: "600",
  },
  emailText: {
    color: "#fff",
    opacity: 0.8,
    marginTop: 4,
    fontSize: 14,
  },

  /* LOGO TENGAH */
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  /* AVATAR & KAMERA */
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    flexGrow: 1,
    paddingBottom: 150,
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

  /* TOMBOL SAVE */
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

  /* TOMBOL CANCEL */
  cancelBtn: {
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 10,
  },
  cancelBtnText: {
    color: "#5A3E2B",
    fontSize: 16,
    fontWeight: "bold",
  },
});
