// WelcomeScreen.js and UserScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GradientBackground from './GradientBackground';

const WelcomeScreen = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('User');
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={handlePress}>
          <Text style={styles.text}>Get Started</Text>
        </TouchableOpacity>
        <View styles={styles.bottomBox}>
            <Text style={styles.bottomText}>Uncover budget-friendly flights at the simplest request.</Text>
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    padding: 20,
    backgroundColor: '#90BE6D',
    borderRadius: 10,
    width: '45%',

    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
  },
  bottomBox: {
    marginTop: 20, // Adjust spacing as needed
    padding: 20,
    backgroundColor: '#F4F5E6', // Example color
    borderRadius: 10,
  },
  bottomText: {
    fontSize: 15
  }
});

export default WelcomeScreen;