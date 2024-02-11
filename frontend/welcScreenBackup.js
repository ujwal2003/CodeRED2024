import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import GradientBackground from './GradientBackground';

const WelcomeScreen = ({ navigation }) => {
    const handlePress = () => {
        navigation.navigate('User');
    };

    const { height: viewportHeight } = Dimensions.get('window');
    const infoBoxHeight = viewportHeight * 0.4; // Adjust the percentage as needed

    return (
        <GradientBackground>
            <View style={styles.container}>
                <View style={[styles.infoBox, { height: infoBoxHeight }]}>
                    <Text style={styles.infoText}>
                        Uncover <Text style={styles.boldText}>budget-friendly</Text> flights at the <Text style={styles.boldText}>simplest</Text> request.
                    </Text>
                    <TouchableOpacity style={styles.touchable} onPress={handlePress}>
                        <Text style={styles.text}>Get Started</Text>
                    </TouchableOpacity>
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
    infoBox: {
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F4F5E6',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    infoText: {
        fontSize: 15,
        textAlign: 'center'
    },
    boldText: {
        fontWeight: 'bold',
    },
    touchable: {
        paddingVertical: 20,
        paddingHorizontal: 40,
        backgroundColor: '#90BE6D',
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        color: '#FFF'
    },
});

export default WelcomeScreen;