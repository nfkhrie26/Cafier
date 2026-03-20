import React from "react";
import {View,Text,StyleSheet,TouchableOpacity, SafeAreaView,Image,ScrollView} from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");

      await axios.post(
        "http://192.168.1.24:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    } catch (e) {
      console.log("skip");
    } finally {
      await SecureStore.deleteItemAsync("userToken");
      router.replace("/(auth)/login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
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

        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/serene-logo-cokelat.png")}
            style={styles.logo}
          />
        </View>

        {/* MEMBERSHIP */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Silver</Text>
          <Text style={styles.cardSub}>30 Points away from Gold</Text>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.benefit}>View Benefits</Text>
            <Ionicons name="chevron-forward" size={16} color="#3E2A1F" />
          </View>
        </View>

        {/* MENU */}
        <View style={styles.menuContainer}>
          {menuButton("Change Profile")}
          {menuButton("Order Status")}
          {menuButton("Order History")}
          {menuButton("Logout", handleLogout)}
        </View>

        {/* FOOTER LOGO */}
        <Image
          source={require("../../assets/images/serene-logo-cokelat.png")}
          style={styles.footerLogo}
        />

      </ScrollView>
    </SafeAreaView>
  );

  function menuButton(title: string, onPress?: () => void) {
    return (
      <TouchableOpacity style={styles.menuBtn} onPress={onPress}>
        <Text style={styles.menuText}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE3D3"
  },

  /* HEADER */
  header: {
    backgroundColor: "#5A3E2B",
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  welcome: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600"
  },

  email: {
    color: "#fff",
    opacity: 0.8,
    marginTop: 4
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },

  /* LOGO */
  logoContainer: {
    alignItems: "center",
    paddingVertical: 35
  },

  logo: {
    width: 260,
    height: 90,
    resizeMode: "contain"
  },

  /* MEMBERSHIP CARD */
  card: {
    backgroundColor: "#C8A882",
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 18
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3E2A1F"
  },

  cardSub: {
    marginTop: 4,
    color: "#3E2A1F"
  },

  progressBar: {
    height: 10,
    backgroundColor: "#EADBC8",
    borderRadius: 20,
    marginTop: 15,
    overflow: "hidden"
  },

  progressFill: {
    width: "75%",
    height: 10,
    backgroundColor: "#5A3E2B",
    borderRadius: 20
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10
  },

  benefit: {
    marginRight: 4,
    fontSize: 12,
    color: "#3E2A1F"
  },

  /* MENU */
  menuContainer: {
    marginTop: 30,
    paddingHorizontal: 20
  },

  menuBtn: {
    backgroundColor: "#C7772F",
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },

  menuText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },

  /* FOOTER */
  footerLogo: {
    width: 140,
    height: 60,
    alignSelf: "center",
    marginVertical: 40,
    resizeMode: "contain",
    opacity: 0.8
  }
});