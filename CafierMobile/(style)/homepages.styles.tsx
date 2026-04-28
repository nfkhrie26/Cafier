import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6DEC9",
  },
  header: {
    backgroundColor: "#422A1E",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "400",
  },
  emailText: {
    color: "#E0E0E0",
    fontSize: 14,
    marginTop: 2,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120, // Di-gedein biar konten bawah aman pas di-scroll mentok
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  promoCard: {
    backgroundColor: "#F5EFE1",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  promoTitle: {
    fontSize: 18,
    color: "#000",
    marginBottom: 5,
  },
  promoDesc: {
    fontSize: 12,
    color: "#000",
    lineHeight: 18,
    fontWeight: "500",
  },
  promoImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    backgroundColor: "#F5EFE1",
    width: (width - 60) / 2,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#BCA791",
    paddingTop: 15,
    paddingBottom: 35,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
