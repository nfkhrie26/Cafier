import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import HeaderLogo from '@/components/header-logo';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import api from '@/service/utils';

export default function LoginScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const webOutlineStyle = Platform.OS === 'web' ? { outlineStyle: 'none' } : {};


  const handleLogin = async () => {
    try {
      const response = await axios.post('https://trinity-milliary-mitzie.ngrok-free.dev/api/login', {
        email: email,
        password: password,
      },{
  headers: {
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': '69420' // Angka random buat ngelewatin filter Ngrok
  }});

      // 1. Tangkep token dari balikan Laravel
      const token = response.data.token;
      const role = response.data.role;

      // 2. Simpen token ke brankas hape (Secure Store)
      await SecureStore.setItemAsync('userToken', token);
      await SecureStore.setItemAsync('userRole', role);

      // 3. Kalo sukses, tendang user ke halaman utama (Tabs)
      if (role == 'customer'){
        Alert.alert('Sukses', 'Berhasil Login, bro!');
        router.replace('../(customer)/(tabs)/homepages'); 
      } else if (role == 'barista'){
        Alert.alert('Sukses', 'Berhasil Login, bro!');
        router.replace('../(barista)/(tabs)/dashboard'); 
      } else {
        Alert.alert('Sukses', 'Berhasil Login, bro!');
        router.replace('../(barista)/(tabs)/dashboard'); 
      }
      

    } catch (error: any) {
      // Tangkep error dari Laravel (misal: password salah)
      console.log(error.response?.data?.message)
      Alert.alert('Gagal', error.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.topHeader}>
        <HeaderLogo />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.welcomeTitle}>WELCOME !</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput 
            style={[styles.input, webOutlineStyle as any]} 
            onChangeText={setEmail}
            placeholder="Username"
            placeholderTextColor="#A8926D" 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput 
              style={[styles.passwordInput, webOutlineStyle as any]} 
              onChangeText={setPassword}
              placeholder="**********"
              placeholderTextColor="#A8926D"
              secureTextEntry={!isPasswordVisible} 
            />

            <TouchableOpacity 
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={isPasswordVisible ? "eye-off" : "eye"} 
                size={20} 
                color="#A8926D" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/forget-password' as any)}>
          <Text style={styles.forgotText}>Forget the password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register' as any)}>
          <Text style={styles.registerText}>
            Don’t have an account? <Text style={{ fontWeight: 'bold' }}>register now</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E2A1D', 
  },
  topHeader: {
    flex: 0.5, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40, 
  },
  formContainer: {
    flex: 1.5, 
    backgroundColor: '#E1D7C6', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingHorizontal: 40,
    paddingTop: 40,
    alignItems: 'center', 
  },
  welcomeTitle: {
    fontSize: 28,
    fontFamily: 'serif',
    color: '#3E2A1D',
    letterSpacing: 2,
    fontWeight: 'bold',
    marginBottom: 40,
    width: '100%',
    textAlign: 'left', 
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E2A1D',
    marginBottom: 8,
    paddingLeft: 5,
  },
  input: {
    backgroundColor: '#EFE3CA', 
    borderWidth: 1,
    borderColor: '#A8926D',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
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
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
  },
  eyeIcon: {
    padding: 5,
  },
  loginButton: {
    backgroundColor: '#C27A32', 
    width: '100%', 
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3E2A1D',
    marginBottom: 15,
    textAlign: 'center',
  },
  registerText: {
    fontSize: 12,
    color: '#3E2A1D',
    textAlign: 'center',
  },
});