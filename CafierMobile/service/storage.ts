import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Fungsi nyimpen dompet
export const setItemAsync = async (key: string, value: string) => {
  if (Platform.OS === 'web') {
    try { localStorage.setItem(key, value); } catch (e) { console.log(e); }
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

// Fungsi ngambil isi dompet
export const getItemAsync = async (key: string) => {
  if (Platform.OS === 'web') {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

// Fungsi buang dompet (logout)
export const deleteItemAsync = async (key: string) => {
  if (Platform.OS === 'web') {
    try { localStorage.removeItem(key); } catch (e) { console.log(e); }
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};