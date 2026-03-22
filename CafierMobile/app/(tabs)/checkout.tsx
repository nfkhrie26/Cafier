import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import api from '../../service/utils';
import { WebView } from 'react-native-webview';
import { Modal } from 'react-native';

export default function checkout(){

    const DUMMY_CART = [
        { id: 1, name: 'Ice Caramel Macchiato', price: 25000, qty: 2 },
        { id: 2, name: 'Espresso (Hot)', price: 18000, qty: 1 },
        { id: 3, name: 'Croissant Butter', price: 20000, qty: 1 },  
    ];
    const router = useRouter();
    const [orderType, setOrderType] = useState('dine_in'); // dine_in | takeaway
    const [paymentMethod, setPaymentMethod] = useState('qris'); // qris | cash
    const [loading, setLoading] = useState(false);
    
    const [snapToken, setSnapToken] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const subtotal = DUMMY_CART.reduce((total, item) => total + (item.price * item.qty), 0);
    const tax = subtotal * 0.11;
    const grandTotal = subtotal + tax;

    const formatRp = (angka: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
    };

    const handleCheckout = async () => {
        setLoading(true);
        try {
        const payload = {
            total_amount: grandTotal,
            items: DUMMY_CART,
        };

        const response = await api.post('/checkout', payload);
        
        // 3. TANGKEP TOKENNYA, TAMPILIN WEBVIEW-NYA
        setSnapToken(response.data.snap_token);
        setShowPayment(true); // Munculin popup Midtrans!

        } catch (error: any) {
            console.log("ERROR STATUS:", error.response?.status);
            console.log("ERROR DATA ASLI DARI LARAVEL:", error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const onNavigationStateChange = (navState: any) => {
        const url = navState.url;
        console.log("URL:", url);
        if (url.includes('cafier-app.com')) { 
            
            // 1. APAPUN STATUSNYA, TUTUP DULU WEBVIEW-NYA!
            setShowPayment(false);

            // 2. Baru kita cek statusnya lunas, pending, atau batal
            if (url.includes('cafier-app.com') || url.includes('transaction_status=settlement') || url.includes('transaction_status=capture')) {
                Alert.alert('Lunas Bos! 🎉', 'Pembayaran berhasil, kopi lagi diseduh.');
                router.replace('/(tabs)/checkout'); 
                
            } else if (url.includes('transaction_status=pending')) {
                Alert.alert('Menunggu Pembayaran ⏳', 'Kalo udah dapet nomor VA, jangan lupa ditransfer ya.');
                router.replace('/(tabs)/checkout');

            } else {
                // Ini bakal ke-trigger kalo user klik tombol Tutup/Cancel bawaan Midtrans
                Alert.alert('Dibatalkan ❌', 'Lu ngebatalin pembayaran.');
            }
        }
    };

    // const handleLogout = async () => {
    //     try {
    //     // 1. Ambil token dulu buat dikasih ke Laravel (biar Laravel tau siapa yang mau logout)
    //     const token = await SecureStore.getItemAsync('userToken');

    //     // 2. Tembak API Logout
    //     await axios.post('http://192.168.1.24:8000/api/logout', {}, {
    //         headers: {
    //         Authorization: `Bearer ${token}`
    //         }
    //     });

    //     } catch (error) {
    //     console.log("Laravel udah hapus atau token kadaluarsa, lanjut hapus lokal aja.");
    //     } finally {
    //     // 3. APAPUN YANG TERJADI, hapus token di hape dan balik ke login
    //     await SecureStore.deleteItemAsync('userToken');
        
    //     // 4. Tendang ke halaman login (pake replace biar gak bisa 'Back')
    //     router.replace('/(auth)/login');
    //     }
    // };

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Pressable
                onPress={handleCheckout}
                style={{ backgroundColor: "#4CAF50", padding: 12, borderRadius: 8 }}
                >
                <Text style={{ color: "white", textAlign: "center" }}>Coba Checkout</Text>
            </Pressable>
            {/* <Pressable
                onPress={handleLogout}
                style={{ backgroundColor: "#4CAF50", padding: 12, borderRadius: 8, margin: 50 }}
                >
                <Text style={{ color: "white", textAlign: "center" }}>Logout</Text>
            </Pressable> */}
            <Modal visible={showPayment} animationType="slide" transparent={false}>
                <WebView
                // Nembak ke server Sandbox Midtrans, tempelin snapToken di belakangnya
                source={{ uri: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}` }}
                onNavigationStateChange={onNavigationStateChange}
                startInLoadingState={true}
                renderLoading={() => (
                    <ActivityIndicator 
                    size="large" 
                    color="#C27A32" 
                    style={{ position: 'absolute', top: '50%', left: '50%' }} 
                    />
                )}
                javaScriptEnabled={true} 
                domStorageEnabled={true}
                />
                
                {/* Tombol buat ngebatalin dan nutup popup */}
                <TouchableOpacity 
                style={{ padding: 15, backgroundColor: '#3E2A1D', alignItems: 'center' }} 
                onPress={() => setShowPayment(false)}
                >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Tutup</Text>
                </TouchableOpacity>
            </Modal>
        </View>

        
    );
}