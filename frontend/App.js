import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// View --> UIView
// SafeAreaView --> Helps notches not cover content
export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#115E81', '#86BBD8']}
        style={{ flex: 1, width: '100%' }}
      >
        <SafeAreaView>
          <Text style={styles.text}>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
