import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HeaderLogo from '../../components/header-logo';

export default function ForgetPasswordScreen() {
  const router = useRouter();

  const webOutlineStyle = Platform.OS === 'web' ? { outlineStyle: 'none' } : {};

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.topHeader}>
        <HeaderLogo />
      </View>

      <View style={styles.formContainer}>
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

        <TouchableOpacity 
            style={styles.sendButton}
            onPress={() => alert('Link sent!')}
        >
          <Text style={styles.sendButtonText}>Send to email</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={styles.backText}>Back to Login</Text>
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
    paddingTop: 60,
    alignItems: 'center', 
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
  sendButton: {
    backgroundColor: '#C27A32', 
    width: '100%', 
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    elevation: 3,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backText: {
    fontSize: 12,
    color: '#3E2A1D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});