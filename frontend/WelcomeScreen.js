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
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        Uncover <Text style={styles.boldText}>budget-friendly</Text> flights at the 
                        <Text style={styles.boldText}> simplest</Text> request.
                    </Text>
                </View>
                <TouchableOpacity style={styles.touchable} onPress={handlePress}>
                    <Text style={styles.text}>Get Started</Text>
                </TouchableOpacity>
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
        bottom: -90,
        backgroundColor: '#90BE6D',
        borderRadius: 10,
        width: '45%',

        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
    },
    infoBox: {
        position: 'absolute',
        bottom: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F5E6',
        borderRadius: 10,
        paddingHorizontal: 50,
        paddingTop: 250,
        paddingBottom: 125,
    },
    infoText: {
        fontSize: 15,
        marginBottom: 20,
        textAlign: 'center'
    },
    boldText: {
        fontWeight: 'bold',
      },
});

export default WelcomeScreen;