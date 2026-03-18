import { Pressable, Text, View } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function profile (){
    const router = useRouter();
    
    const handleLogout = async () => {
        try {
        // 1. Ambil token dulu buat dikasih ke Laravel (biar Laravel tau siapa yang mau logout)
        const token = await SecureStore.getItemAsync('userToken');

        // 2. Tembak API Logout
        await axios.post('http://192.168.1.24:8000/api/logout', {}, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });

        } catch (error) {
        console.log("Laravel udah hapus atau token kadaluarsa, lanjut hapus lokal aja.");
        } finally {
        // 3. APAPUN YANG TERJADI, hapus token di hape dan balik ke login
        await SecureStore.deleteItemAsync('userToken');
        
        // 4. Tendang ke halaman login (pake replace biar gak bisa 'Back')
        router.replace('/(auth)/login');
        }
    };

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"}}>
            <Text>Ini Profile</Text>
            <Pressable 
                style={{backgroundColor: "#4CAF50"}}
                onPress={handleLogout}
                >
                <Text style={{ color: "white", textAlign: "center", margin: 30}}>LOGOUT</Text>
            </Pressable>
        </View>
    )
}