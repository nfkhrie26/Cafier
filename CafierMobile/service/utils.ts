import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

// UBAH LINK INI KALAU NGROK LU DI RESTART!
const NGROK_URL = "https://broiler-anyone-unloving.ngrok-free.dev";

export const IMAGE_BASE_URL = `${NGROK_URL}/storage/`;

// 1. Bikin instance (kurir khusus buat Cafier)
const api = axios.create({
  // SKEPTIS ALERT: Pastiin IP lu belom ganti ya!
  baseURL: `${NGROK_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "69420", // Ditaruh sini biar otomatis dipake di semua request
  },
});

// 2. REQUEST INTERCEPTOR: Satpam Pintu Keluar Hape
// Sebelum data dikirim ke Laravel, selipin token di dalem jaket kurirnya
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 3. RESPONSE INTERCEPTOR: Satpam Pintu Masuk Hape
// Ngecek balasan dari Laravel. Kalo disuruh pulang (401), otomatis logout.
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Kalo token kadaluarsa atau gak valid (Error 401)
    if (error.response && error.response.status === 401) {
      console.log("Token mati bro, auto-logout!");
      // Hapus sisa token di brankas
      await SecureStore.deleteItemAsync("userToken");
      // Tendang balik ke halaman login
      router.replace("/(auth)/login");
    }
    return Promise.reject(error);
  },
);

export default api;
