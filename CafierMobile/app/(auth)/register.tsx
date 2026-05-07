import HeaderLogo from '@/components/header-logo';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Stack, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { 
  Alert, 
  Dimensions, 
  Platform, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  KeyboardAvoidingView, // <-- Tambahan
  TouchableWithoutFeedback, // <-- Tambahan
  Keyboard // <-- Tambahan
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

export default function RegisterScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(''); 
  const [loading, setLoading] = useState(false);

  const webOutlineStyle = Platform.OS === 'web' ? { outlineStyle: 'none' } : {};

  const handleRegister = async () => {
    if (!name || !email || !password || !dob) {
      Alert.alert('Eitss!', 'Semua field wajib diisi ya!');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('https://posttetanic-latanya-unemanative.ngrok-free.dev/api/register', {
        name, email, password, dob, 
      });
      const token = response.data.token;
      if (token) {
          await SecureStore.setItemAsync('userToken', token);
          Alert.alert('Mantap!', 'Akun Cafier lu udah jadi.');
          router.replace('../(customer)/(tabs)/homepages');
          return; 
      }

    } catch (error: any) {
        console.log("ISI ERROR ASLI:", error.response?.data);

        // Kita cast 'any' lagi di sini supaya aman pas akses propertinya
        const laravelError = error.response?.data?.errors as any;
        let errorMsg = 'Gagal daftar, coba cek lagi datanya.';

        if (laravelError) {
            // Ambil pesan error pertama dari Laravel
            // Kita paksa jadi any supaya index [0][0] nggak error
            const errorsArray = Object.values(laravelError) as any[][];
            if (errorsArray.length > 0 && errorsArray[0].length > 0) {
                errorMsg = errorsArray[0][0];
            }
        } else if (error.response?.data?.message) {
            errorMsg = error.response.data.message;
        }

        Alert.alert('Waduh!', errorMsg);
    }
  };

  return (
    // KeyboardAvoidingView supaya UI naik saat keyboard muncul
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#3E2A1D' }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* TouchableWithoutFeedback supaya bisa klik di luar buat tutup keyboard */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Bagian Atas Cokelat */}
          <View style={styles.topHeader}>
            <HeaderLogo />
          </View>

          {/* Bagian Form Beige/Krem */}
          <View style={styles.formContainer}>
            <Text style={styles.welcomeTitle}>WELCOME !</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput 
                style={[styles.input, webOutlineStyle as any]} 
                value={name}
                onChangeText={setName}
                placeholder="Name"
                placeholderTextColor="#A8926D"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput 
                style={[styles.input, webOutlineStyle as any]}
                value={email}
                onChangeText={setEmail} 
                placeholder="example@gmail.com"
                placeholderTextColor="#A8926D"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput 
                  style={[styles.passwordInput, webOutlineStyle as any]} 
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor="#A8926D"
                  secureTextEntry={!isPasswordVisible} 
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={20} color="#A8926D" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of birth</Text>
              <TextInput 
                style={[styles.input, webOutlineStyle as any]} 
                value={dob}
                onChangeText={setDob}
                placeholder="YYYY-MM-DD" 
                placeholderTextColor="#A8926D"
              />
            </View>

            <TouchableOpacity 
              style={[styles.registerButton, { opacity: loading ? 0.7 : 1 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>
                  {loading ? 'Sabar...' : 'Create an account'}
              </Text>
            </TouchableOpacity>
          
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.backText}>
                Already have an account? <Text style={{ fontWeight: 'bold' }}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1, // Penting: Supaya konten bisa narik ke bawah
    backgroundColor: '#E1D7C6', // Set background krem di sini supaya nutup cokelat
  },
  topHeader: {
    height: screenHeight * 0.25, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E2A1D', // Header tetap cokelat
  },
  formContainer: {
    flex: 1, // Menarik form sampai ke paling bawah layar
    backgroundColor: '#E1D7C6',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 40, // Kasih jarak bawah dikit
    marginTop: -20, // Sedikit overlap ke atas biar radiusnya cakep
  },
  welcomeTitle: {
    fontSize: 28,
    color: '#3E2A1D',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputGroup: { width: '100%', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#3E2A1D', marginBottom: 8 },
  input: {
    backgroundColor: '#EFE3CA',
    borderWidth: 1,
    borderColor: '#A8926D',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFE3CA',
    borderWidth: 1,
    borderColor: '#A8926D',
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 10,
  },
  passwordInput: { flex: 1, paddingVertical: 12, color: '#000' },
  registerButton: {
    backgroundColor: '#C27A32',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  registerButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  backText: { textAlign: 'center', fontSize: 12, color: '#3E2A1D' }
});