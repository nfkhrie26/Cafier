import { IMAGE_BASE_URL } from "@/service/utils";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView, // 🚨 IMPORT SCROLLVIEW DI SINI
} from "react-native";

const { width } = Dimensions.get("window");

const formatRupiah = (angka: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);

export default function ProductList({
  data = [],
  searchQuery = "",
  origin = "",
  numColumns = 1,
}: {
  data?: any[];
  searchQuery?: string;
  origin?: string;
  numColumns?: number;
}) {
  const filteredData = data.filter((item) => {
    return (
      item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (filteredData.length === 0) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Menu tidak ditemukan</Text>
      </View>
    );
  }

  const isGrid = numColumns > 1;

  return (
    // 🚨 UBAH VIEW JADI SCROLLVIEW
    // contentContainerStyle dipake buat flexWrap kalau mode Grid
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={[
        isGrid && styles.gridWrapper,
        { paddingBottom: 100 } // 🚨 Jaga-jaga biar bawahnya nggak kepotong navbar
      ]}
    >
      {filteredData.map((product, index) => {
        let isTersedia = product.stock > 0 || product.is_available === true;
        let pesanHabis = product.stock <= 0 ? "Stok Habis" : "Tidak Tersedia";

        return (
          <TouchableOpacity
            key={product._id || product.id || index.toString()}
            style={[
              styles.productCard,
              isGrid ? styles.gridCard : styles.listCard, 
              !isTersedia && { opacity: 0.5 },
            ]}
            disabled={!isTersedia}
            onPress={() => {
              router.push({
                pathname: "/rincian",
                params: {
                  id: product._id || product.id,
                  name: product.name,
                  price: product.price,
                  desc: product.description,
                  imageUrl: product.image,
                  variants: JSON.stringify(product.variants || []),
                  origin: origin,
                },
              });
            }}
          >
            {/* BAGIAN GAMBAR */}
            <View
              style={isGrid ? styles.imageWrapperGrid : styles.imageWrapperList}
            >
              <Image
                source={
                  product.image
                    ? { uri: `${IMAGE_BASE_URL}${product.image}` }
                    : require("@/assets/images/serene-logo.png")
                }
                style={isGrid ? styles.productImageGrid : styles.productImage}
              />
              {!isTersedia && (
                <View style={styles.overlayHabis}>
                  <Text style={styles.textHabis}>{pesanHabis}</Text>
                </View>
              )}
            </View>

            {/* BAGIAN INFO */}
            <View
              style={[
                styles.productInfo,
                isGrid && { marginLeft: 0, marginTop: 8, alignItems: "center" },
              ]}
            >
              <Text
                style={[styles.productName, isGrid && { textAlign: "center" }]}
                numberOfLines={1}
              >
                {product.name}
              </Text>

              {!isGrid && (
                <Text style={styles.productDesc} numberOfLines={2}>
                  {product.description}
                </Text>
              )}

              <Text
                style={[styles.productPrice, isGrid && { textAlign: "center" }]}
              >
                {formatRupiah(product.price)}
              </Text>

              {product.stock !== undefined && product.stock > 0 && (
                <Text
                  style={[styles.stockText, isGrid && { textAlign: "center" }]}
                >
                  Sisa: {product.stock}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, // 🚨 Wajib biar ScrollView ngisi penuh wadahnya
    width: "100%" 
  },
  gridWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    backgroundColor: "#F5EFE1",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
  },
  listCard: { flexDirection: "row", alignItems: "center" },
  gridCard: { width: "48%", flexDirection: "column" },

  productImage: { width: 60, height: 60, borderRadius: 10 },
  productImageGrid: { width: "100%", height: 120, borderRadius: 10 },

  imageWrapperList: { width: 60, height: 60 },
  imageWrapperGrid: { width: "100%", height: 120 },

  productInfo: { flex: 1, marginLeft: 10 },
  productName: { fontSize: 14, fontWeight: "bold", color: "#000" },
  productDesc: { fontSize: 11, color: "#555", marginBottom: 6 },
  productPrice: { fontSize: 14, fontWeight: "bold", color: "#000" },

  notFoundContainer: { padding: 20, alignItems: "center" },
  notFoundText: { color: "#888" },

  overlayHabis: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textHabis: { color: "white", fontSize: 10, fontWeight: "bold" },
  stockText: {
    fontSize: 11,
    color: "#C87A3F",
    marginTop: 4,
    fontWeight: "bold",
  },
});