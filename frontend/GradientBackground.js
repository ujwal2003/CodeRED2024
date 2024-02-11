// GradientBackground.js
import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackground = ({ children }) => (
  <LinearGradient
    colors={['#115E81', '#86BBD8']}
    style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
  >
    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </View>
  </LinearGradient>
);

export default GradientBackground;