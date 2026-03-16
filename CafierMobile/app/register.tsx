import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HeaderLogo from '../components/header-logo';

const { height: screenHeight } = Dimensions.get('window');

export default function RegisterScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const webOutlineStyle = Platform.OS === 'web' ? { outlineStyle: 'none' } : {};

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollWrapper}
        contentContainerStyle={styles.scrollContent} 
        bounces={false}
      >
        <View style={styles.topHeader}>
          <HeaderLogo />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeTitle}>WELCOME !</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput 
              style={[styles.input, webOutlineStyle as any]} 
              placeholder="Username"
              placeholderTextColor="#A8926D"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={[styles.input, webOutlineStyle as any]} 
              placeholder="example@gmail.com"
              placeholderTextColor="#A8926D"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput 
                style={[styles.passwordInput, webOutlineStyle as any]} 
                placeholder="Password"
                placeholderTextColor="#A8926D"
                secureTextEntry={!isPasswordVisible} 
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Ionicons 
                  name={isPasswordVisible ? "eye-off" : "eye"} 
                  size={20} 
                  color="#A8926D" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of birth</Text>
            <TextInput 
              style={[styles.input, webOutlineStyle as any]} 
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#A8926D"
            />
          </View>

          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => alert('Account Created!')}
          >
            <Text style={styles.registerButtonText}>Create an account</Text>
          </TouchableOpacity>
        
          <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
            <Text style={styles.backText}>
              Already have an account? <Text style={{ fontWeight: 'bold' }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E2A1D',
  },
  scrollWrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1, 
  },
  topHeader: {
    height: screenHeight * 0.25, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#3E2A1D',
  },
  formContainer: {
    flex: 1, 
    backgroundColor: '#E1D7C6',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontFamily: 'serif',
    color: '#3E2A1D',
    letterSpacing: 2,
    fontWeight: 'bold',
    marginBottom: 40,
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
  registerButton: {
    backgroundColor: '#C27A32',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
    elevation: 3,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#3E2A1D',
  }
});