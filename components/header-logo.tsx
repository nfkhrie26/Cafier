import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function HeaderLogo() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/serene-logo.png')} 
        style={styles.imageLogo}
        resizeMode="contain"
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 50,
    backgroundColor: '#3E2A1D', 
  },
  imageLogo: {
    width: 280,
    height: 280,
  }
});